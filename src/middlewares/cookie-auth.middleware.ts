import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { env } from 'process';
import { AppService } from 'src/app.service';
import encryptHelper from '../common/utils/encrypter.utils';

@Injectable()
export class CookieAuthMiddleware implements NestMiddleware {
  private request;
  constructor(private readonly appService: AppService) {}
  async use(req: any, res: any, next: () => void) {
    this.request = req;
    const accessParams = this.getAccessParams(req);
    if (typeof accessParams !== 'object') {
      throw new UnauthorizedException();
    }

    if (this.isCookeExpired(accessParams.ttl)) {
      throw new UnauthorizedException();
    }

    await this.setIdentity(accessParams);
    next();
  }

  setIdentity = async (accessParams) => {
    try {
      //if can verify the token, set req.user and pass to next middleware
      let identity = null;
      if (this.request.session.user) {
        identity = this.request.session.user;
      } else {
        identity = await this.appService.findUserIdentity({
          uid: accessParams.uid,
          is_delete: 0,
          sub_id: accessParams.sub_id,
          store_id: accessParams.store_id,
        });
      }
      if (identity !== null) {
        //set in request
        this.request.session.user = identity;
        this.request.session.server = accessParams.server;
      }
    } catch (ex) {
      console.log(ex);
      throw new HttpException('Something went wrong', 500);
    }
  };

  getAccessParams = (request) => {
    const cookieList = [];
    for (const cookieName in request.cookies) {
      if (cookieName == env.COOKIE_NAME) {
        //validating cookie of multistore's dashboard
        const jwtToken = JSON.parse(
          encryptHelper.decrypt(request.cookies[cookieName]),
        );
        if (jwtToken) {
          cookieList.push(request.cookies[cookieName]);
        }
      } else if (cookieName.match(/^ucf_y[a-zA-Z0-9]{32}/)) {
        //validating cookie for 2.0
        //cookie name pattern
        const jwtToken = JSON.parse(
          encryptHelper.decrypt(request.cookies[cookieName]),
        );

        let origin = request.get('origin');

        if (!origin) {
          origin = request.get('referer');
        }

        if (!origin) {
          origin = request.query.referer;
        }
        if (origin.indexOf(jwtToken.server) !== false) {
          cookieList.push(request.cookies[cookieName]);
        }
      }
    }

    if (cookieList.length < 1) {
      return false;
    }
    const cookieValue = cookieList[0];
    const jwtToken = encryptHelper.decrypt(cookieValue);
    const accessParams = JSON.parse(jwtToken);
    return accessParams;
  };

  isCookeExpired = (expiryInSeconds) => {
    const currentTimeInSeconds = new Date().getTime() / 1000;
    if (expiryInSeconds < currentTimeInSeconds) {
      return true;
    }
    return false;
  };
}

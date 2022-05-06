import * as bcryptjs from 'bcryptjs';

class Bcrypt {
  private static _salt = 10;

  // public static hash(password: string) {
  //   return bcryptjs.hashSync(password, this._salt);
  // }

  public static compare(password: string, hash: string) {
    return bcryptjs.compareSync(password, hash);
  }
}

export default Bcrypt;

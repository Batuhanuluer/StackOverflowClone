


export class RandomToken {
    static  generateRandomToken(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        console.log('token')
        let token = '';
        for (let i = 0; i < length; i++) {
          token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    }
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cookieParser = require('cookie-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const csp = require('helmet-csp');

// CSP ayarlarını yapılandırma
  app.use(csp({
    directives: {
      defaultSrc: ["'self'"], // Sayfa içeriğinin varsayılan kaynağı
      scriptSrc: ["'self'"],  // Betiklerin yüklenmesine izin verilen kaynaklar
      styleSrc: ["'self'"],   // Stillerin yüklenmesine izin verilen kaynaklar
      imgSrc: ["'self'"],     // Resimlerin yüklenmesine izin verilen kaynaklar
      connectSrc: ["'self'"]  // Diğer kaynaklara (API'ler vb.) bağlanma izni
    }
  }));


  app.use(cookieParser())

  await app.listen(3000);

}
bootstrap();

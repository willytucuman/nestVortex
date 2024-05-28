import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('pdf')
export class PdfController {
  @Get('download')
  downloadPdf(@Res() res: Response) {
    const filePath = join(__dirname, '..', 'files', 'example.pdf'); // Ajusta la ruta al archivo PDF
    const fileStream = createReadStream(filePath);

    fileStream.on('error', (err) => {
      console.error('File Stream Error:', err);
      res.status(500).send('Error al descargar el archivo');
    });

    fileStream.on('open', () => {
      console.log('File stream opened, sending response...');
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=example.pdf',
      });
      fileStream.pipe(res);
    });

    fileStream.on('end', () => {
      console.log('File stream ended');
    });
  }
}

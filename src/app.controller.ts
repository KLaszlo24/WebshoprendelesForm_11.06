import { Body, Controller, Get, Render, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { EditOrdersDTO } from './editOrdersdto.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Post('/')
  @Render('index')
  editOrders(@Body() body: EditOrdersDTO){
    const nameRegex = /^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ ]{2,}$/;
    const cityRegex = /^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ ]{2,}$/;
    const zipRegex = /^[0-9]{4}$/;
    const streetRegex = /^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ0-9 .\/-]{2,}$/;
    const phoneRegex = /^\+36[0-9]+$/;
    const couponRegex = /^[A-Z]{2}-[0-9]{4}$/;
    const cardRegex = /^[0-9]{4}(-[0-9]{4}){3}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    const biztkodRegex = /^[0-9]{3}$/;

    if (!nameRegex.test(body.nev)) {
        return { error: "helytelen nev" };
    }
    if (!cityRegex.test(body.szaml_varos)) {
        return { error: "helytelen szamlazasi cim" };
    }

    if (!zipRegex.test(body.szaml_irsz)) {
        return { error: "helytelen iranyitoszam" };
    }

    if (!streetRegex.test(body.szaml_utca)) {
        return { error: "helytelen szamlazasi utca" };
    }

    if (!cityRegex.test(body.szall_varos)) {
        return { error: "helytelen szallitasi cim" };
    }

    if (!zipRegex.test(body.szall_irsz)) {
        return { error: "helytelen iranyitoszam" };
    }

    if (!streetRegex.test(body.szall_utca)) {
        return { error: "helytelen szallitasi utca" };
    }

    if (!phoneRegex.test(body.telefon)) {
        return { error: "helytelen telefonszám" };
    }

    if (body.kupon && !couponRegex.test(body.kupon)) {
        return { error: "helytelen kuponkód" };
    }

    if (!cardRegex.test(body.kartya)) {
        return { error: "helytelen kártya" };
    }


    if (!expiryRegex.test(body.lejarat)) {
        return { error: "helytelen lejárati dátum" };
    }


    if (!biztkodRegex.test(body.biztkod)) {
        return { error: "helytelen biztonsági kód" };
    }
    const [month, year] = body.lejarat.split('/').map(Number);

    const jelenlegiDatum = new Date();
    const ev = jelenlegiDatum.getFullYear() % 100;
    const honap = jelenlegiDatum.getMonth() + 1;

    if (
        year < ev ||
        (year === ev && month < honap)
    ) {
        return { error: "A kártya lejárt" };
    }

    return {
        success: "Minden adat helyes"
    };

  }

   @Get("ujjatek")
  @Render("ujorders")
  async ujOrdersForm() {

  }

  @Post("ujjatek")
  async UjOrders(@Body() body: EditOrdersDTO) {
    await this.appService.UjOrders(body.nev);
  }
}

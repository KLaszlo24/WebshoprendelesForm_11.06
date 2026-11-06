import { Injectable } from '@nestjs/common';
import mysql from "mysql2/promise"
import { Orders } from './orders.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orders'
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async UjOrders(nev: string){
    const [results] = await mysqlConnection.execute
    ('INSERT INTO orders (customerName) VALUES (?)', [nev]);
    console.log(results);
  }
  
}

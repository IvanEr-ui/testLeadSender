import express from 'express';
import cors from 'cors'
import WebHookRouters from './modules/webhook/webhook.routers';
import { LeadRouters } from './modules/lead/lead.routers';
import { ContactRouters } from './modules/contact/contact.routers';
import DataBaseHelper from './helpers/DataBaseHelper';
import MySQLClient from './common/clients/MySQLClient';
import mySqlKnexConfig from './config/mySql.config';


const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  methods: "GET, PATCH, POST",
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

const db = new DataBaseHelper(new MySQLClient(mySqlKnexConfig))
app.use('/webhook', new WebHookRouters(db).router);
app.use('/lead', new LeadRouters(db).router);
app.use('/contact', new ContactRouters(db).router);

app.listen(PORT, function(){ console.log(`Сервер начал принимать запросы по адресу http://localhost:${PORT}`)});
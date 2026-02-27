import { About } from "../interfaces/about.interface";

export const ABOUT_MOCK: About = {
  _id: 'about-1',
  
  company: {
    title: 'Sobre a Empresa',
    paragraph: [
      {
        _id: 1,
        phrases: 'Nossa empresa nasceu com o propósito de transformar ambientes em espaços acolhedores e cheios de significado.'
      },
      {
        _id: 2,
        phrases: 'Trabalhamos com dedicação para oferecer produtos artesanais que transmitam calma, conexão e identidade.'
      }
    ]
  },

  businesswoman: {
    title: 'Sobre a Fundadora',
    paragraph: [
      {
        _id: 1,
        phrases: 'Empreendedora apaixonada por arte manual e decoração afetiva.'
      },
      {
        _id: 2,
        phrases: 'Acredita que cada peça carrega energia, história e intenção.'
      }
    ]
  }
};
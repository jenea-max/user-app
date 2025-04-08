// Определение интерфейса для географических координат
export interface Geo {
  lat: string;
  lng: string;
}

// Определение интерфейса для адреса
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

// Определение интерфейса для компании
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Основной интерфейс для пользователя
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

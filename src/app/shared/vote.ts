export interface Category {
  id: string;
  name: string;
  nominees: Nominee[];
}


export interface Nominee {
  id: string;
  name: string;
  image: string;
}

export interface Vote {
  nomineeId: string;
  categoryId: string;
}

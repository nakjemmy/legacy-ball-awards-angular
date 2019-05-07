export interface Category {
  id: string;
  name: string;
  nominees: Nominee[];
}


export interface Nominee {
  id: string;
  name: string;
  image: string;

  // function getCategory(){}
}

export interface Vote {
  candidateId: string;
  categoryId: string;
  count: number;
}

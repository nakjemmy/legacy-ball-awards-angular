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

export interface VoteResult {
  id: string;
  voteCount: number;
  category: {
    id: string;
    name: string;
  };
  nominee: {
    id: string;
    name: string;
  };
}

// export interface VoteCategory {
//   category:
//   voteCount: number;
//   category: {
//     id: string;
//     name: string;
//   };
//   nominee: {
//     id: string;
//     name: string;
//   };
// }

export interface TodoItem {
  id: string
  title: string
  quote: string
  owner: string
  dueDate?: Date
  completed: boolean
}

export enum Filter {
  All,
  Active,
  Completed,
}

export enum Sort {
  NoSort,
  Asc,
  Desc,
}

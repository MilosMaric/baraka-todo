export interface TodoItem {
  id: string
  title: string
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

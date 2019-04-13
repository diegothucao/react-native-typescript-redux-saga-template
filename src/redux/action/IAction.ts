export default interface IAction<P, D> {
    type: string
    payload?: P
    data?: D
    error?: string
  }
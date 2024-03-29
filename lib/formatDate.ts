export const formatDate = (dateString: string | undefined): string => {
  const date = dateString ? new Date(dateString) : new Date()
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`
  return formattedDate
}

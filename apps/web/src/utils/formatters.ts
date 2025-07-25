const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
  dateStyle: "medium"
})

const formatters = {
  date(date: number | Date) {
    return dateFormatter.format(date)
  }
}

export { formatters }

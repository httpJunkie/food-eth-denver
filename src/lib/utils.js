export function ellipseAddress(address = '', width = 10) {
  if (!address) {
    return '';
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export const keyBlock = (event) => {
  const characterCode = event.which ? event.which : event.keyCode

  switch (true) {
    case characterCode === 43:
    case characterCode === 45:
      return event.preventDefault()
    default:
      break
  }
}

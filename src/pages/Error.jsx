import React from 'react'
import "../css/WrongUrlComponent.css"

export default function Error() {
  return (
  <div class="loader">
   <div data-glitch="ERROR 404 ..." class="glitch">
      ERROR 404 ...
    </div>
    <div data-glitch="SORRY WRONG URL" class="glitch">
      SORRY WRONG URL
    </div>
  </div>
  )
}

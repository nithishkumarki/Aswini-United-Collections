import React from 'react'
import './DescriptionBox.css'


const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="description-nav-box">Description</div>
            <div className="description-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>
            Experience ultimate comfort and style with our lightweight shirt. Crafted from breathable, high-quality fabric, this shirt is perfect for warm weather and casual outings.
            </p>
            <p>
            Its sleek design and soft texture ensure you stay cool and look sharp all day long. Ideal for layering or wearing on its own, this versatile shirt is a must-have addition to your wardrobe.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox
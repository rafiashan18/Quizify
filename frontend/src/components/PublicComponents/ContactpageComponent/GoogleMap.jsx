import React from 'react'

const GoogleMap = () => {
  return (
    <div style={{ width: '100%', height: '450px', overflow: 'hidden' ,  }} className='flex justify-center my-4'>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27227.274491171676!2d74.2780741!3d31.45792485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1735805200886!5m2!1sen!2s"
      width="1250"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  )
}

export default GoogleMap
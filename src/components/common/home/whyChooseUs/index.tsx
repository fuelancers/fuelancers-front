import React from 'react'

const items = [
    {
        icon: 'proximity.svg',
        title: 'Proximidad',
        text: 'Encuentra técnicos cerca de tu clínica.',
    },
    {
        icon: 'availability.svg',
        title: 'Disponibilidad',
        text: 'Nuestros técnicos se adaptan a sus necesidades.',
    },
    {
        icon: 'transparency.svg',
        title: 'Transparencia',
        text: 'Busca en base a la maestría técnica, calificaciones y experiencia.',
    }
]

const WhyChooseUse = () => {
  return (
    <section
        className={`py-24 md:py-36 px-4 md:px-8 relative overflow-hidden bg-white`}
      >
        <div className="content-sections">
          <div className="title mb-16 md:mb-20">
            <h2 className="text-center text-3xl md:text-4xl font-black text-[#56575A]">
              ¿Por qué elegirnos?
            </h2>
          </div>
          <div className="body flex-col md:flex md:flex-row">
            {items.map((item, index) => (
                <div className="flex flex-col gap-4 flex-1 mb-10 md:flex-col md:gap-8 items-center md:items-center mb-10" key={index}>
                    <div className="flex justify-center items-center w-[100px] h-[100px]">
                        <img src={`/assets/icons/${item.icon}`} alt={item.title} className="w-14 md:w-full"/>
                    </div>
                    <div className="flex flex-col text-center text-[#8F9093] max-w-[300px]">
                        <h3 className="text-2xl font-black mb-4 text-[#56575A]">{item.title}</h3>
                        <p className="text-md text-[#8F9093] font-medium">{item.text}</p>
                    </div>
                    </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default WhyChooseUse
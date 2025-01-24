import Image from "next/image"

export default function WhatsAppButton({ phoneNumber = "1234567890" }: { phoneNumber?: string }) {
  const whatsappUrl = `https://wa.me/${phoneNumber}`
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <Image
        src={"/whatsapp.svg"}
        alt="whatsapp"
        height={50
        }
        width={50}

      />
    </a>
  )
}

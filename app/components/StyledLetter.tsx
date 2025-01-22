import { motion } from "framer-motion"
import { formatDate } from "../utils/formatDate"
import Image from "next/image"

interface ContactInfo {
  senderName: string
  senderCompany: string
  senderAddress: string
  senderCity: string
  senderState: string
  senderZip: string
  senderPhone: string
  senderEmail: string
  recipientName: string
  recipientCompany: string
  recipientAddress: string
  recipientCity: string
  recipientState: string
  recipientZip: string
}

interface StyledLetterProps {
  content: string
  contactInfo: ContactInfo
  opening: string
  closing: string
  logoUrl: string
  background: string
}

export default function StyledLetter({
  content,
  contactInfo,
  opening,
  closing,
  logoUrl,
  background,
}: StyledLetterProps) {
  const formatAddress = (info: Partial<ContactInfo>, isSender: boolean) => {
    const parts = isSender
      ? [
          info.senderName,
          info.senderCompany,
          info.senderAddress,
          [info.senderCity, info.senderState, info.senderZip].filter(Boolean).join(", "),
          info.senderPhone,
          info.senderEmail,
        ]
      : [
          info.recipientName,
          info.recipientCompany,
          info.recipientAddress,
          [info.recipientCity, info.recipientState, info.recipientZip].filter(Boolean).join(", "),
        ]

    return parts.filter(Boolean).map((part, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        {part}
        {index < parts.length - 1 && <br />}
      </motion.span>
    ))
  }

  const getBackgroundColor = () => {
    switch (background) {
      case "Blue":
        return "bg-blue-50"
      case "Gray":
        return "bg-gray-50"
      case "Green":
        return "bg-green-50"
      default:
        return "bg-white"
    }
  }

  const getOpeningText = () => {
    if (opening === "To Whom It May Concern") {
      return `${opening},`
    } else {
      return `${opening} ${contactInfo.recipientName},`
    }
  }

  return (
    <motion.div
      className={`font-serif text-sm leading-6 p-8 ${getBackgroundColor()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex justify-between items-start ${logoUrl ? "mb-5" : "mb-2"}`}>
        <div className="w-24 h-24 relative">
          {logoUrl && (
            <Image src={logoUrl || "/placeholder.svg"} alt="Company Logo" layout="fill" objectFit="contain" />
          )}
        </div>
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {formatDate(new Date())}
        </motion.div>
      </div>
      <motion.div
        className="mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <br />
      </motion.div>
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {formatAddress(contactInfo, true)}
      </motion.div>
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {formatAddress(contactInfo, false)}
      </motion.div>
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {getOpeningText()}
      </motion.div>
      <motion.div
        className="mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {closing},
      </motion.div>
      <motion.div className="mb-6"></motion.div>
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {contactInfo.senderName}
      </motion.div>
    </motion.div>
  )
}


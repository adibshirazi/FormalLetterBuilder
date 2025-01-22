import { motion } from "framer-motion"
import { formatDate } from "../utils/formatDate"

interface ContactInfo {
  senderName: string
  senderAddress: string
  senderCity: string
  senderState: string
  senderZip: string
  recipientName: string
  recipientCompany: string
  recipientAddress: string
  recipientCity: string
  recipientState: string
  recipientZip: string
}

interface FormattedLetterProps {
  content: string
  contactInfo: ContactInfo
  opening: string
  closing: string
}

export default function FormattedLetter({ content, contactInfo, opening, closing }: FormattedLetterProps) {
  const formatAddress = (info: Partial<ContactInfo>, isSender: boolean) => {
    const parts = isSender
      ? [
          info.senderName,
          info.senderAddress,
          [info.senderCity, info.senderState, info.senderZip].filter(Boolean).join(", "),
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

  const getOpeningText = () => {
    if (opening === "To Whom It May Concern") {
      return `${opening},`
    } else {
      return `${opening} ${contactInfo.recipientName},`
    }
  }

  return (
    <motion.div
      className="font-serif text-sm leading-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-right mb-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {formatDate(new Date())}
      </motion.div>
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
        className="mb-5 whitespace-pre-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {content}
      </motion.div>
      <motion.div className="mb-3"></motion.div>
      <motion.div
        className="mb-5"
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


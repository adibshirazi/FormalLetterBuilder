"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { pdf } from "@react-pdf/renderer"
import LetterPDF from "./LetterPDF"

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

interface PDFDownloaderProps {
  content: string
  contactInfo: ContactInfo
  opening: string
  closing: string
  useStyledForm: boolean
  logoUrl: string
  background: string
  pageSize: "A4" | "LETTER"
  metadata: {
    title: string
    author: string
    subject: string
    keywords: string
  }
}

export default function PDFDownloader({
  content,
  contactInfo,
  opening,
  closing,
  useStyledForm,
  logoUrl,
  background,
  pageSize,
  metadata,
}: PDFDownloaderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const generatePDF = async () => {
    if (typeof window === "undefined") return

    const blob = await pdf(
      <LetterPDF
        content={content}
        contactInfo={contactInfo}
        opening={opening}
        closing={closing}
        useStyledForm={useStyledForm}
        logoUrl={logoUrl}
        background={background}
        pageSize={pageSize}
        metadata={metadata}
      />,
    ).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "formal_letter.pdf"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!isClient) return null

  return (
    <Button onClick={generatePDF} className="mt-2">
      Download PDF
    </Button>
  )
}


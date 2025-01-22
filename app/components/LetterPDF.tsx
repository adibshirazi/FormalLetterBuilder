import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import { formatDate } from "../utils/formatDate"

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    padding: 50,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  headerText: {
    fontSize: 12,
    textAlign: "right",
  },
  address: {
    marginBottom: 20,
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
  },
  signature: {
    marginTop: 20,
  },
  opening: {
    marginBottom: 0,
  },
  spacer: {
    marginBottom: 20,
  },
  singleLineSpace: {
    marginBottom: 12, // Equivalent to one line
  },
  doubleLineSpace: {
    marginBottom: 24, // Equivalent to two lines
  },
  tripleLineSpace: {
    marginBottom: 36,
  },
})

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

interface LetterPDFProps {
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

export default function LetterPDF({
  content,
  contactInfo,
  opening,
  closing,
  useStyledForm,
  logoUrl,
  background,
  pageSize,
  metadata,
}: LetterPDFProps) {
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

    return parts.filter(Boolean).map((part, index) => <Text key={index}>{part}</Text>)
  }

  const getBackgroundColor = () => {
    switch (background) {
      case "Blue":
        return "#EBF8FF"
      case "Gray":
        return "#F7FAFC"
      case "Green":
        return "#F0FFF4"
      default:
        return "#FFFFFF"
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
    <Document
      title={metadata.title}
      author={metadata.author}
      subject={metadata.subject}
      keywords={metadata.keywords}
      creator="ASH letter builder"
    >
      <Page
        size={pageSize}
        style={[styles.page, { backgroundColor: useStyledForm ? getBackgroundColor() : "#FFFFFF" }]}
      >
        <View style={[styles.header, !logoUrl && { marginBottom: 0 }]}>
          {useStyledForm && logoUrl ? (
            <View style={styles.logoContainer}>
              <Image src={logoUrl || "/placeholder.svg"} style={styles.logo} />
            </View>
          ) : (
            <View />
          )}
          <Text style={styles.headerText}>{formatDate(new Date())}</Text>
        </View>
        <View style={styles.spacer}></View>
        <View style={styles.address}>{formatAddress(contactInfo, true)}</View>
        <View style={styles.address}>{formatAddress(contactInfo, false)}</View>
        <View style={styles.opening}>
          <Text>{getOpeningText()}</Text>
        </View>
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
        <View>
          <Text>{closing},</Text>
        </View>
        <View style={styles.tripleLineSpace}></View>
        <View>
          <Text>{contactInfo.senderName}</Text>
        </View>
      </Page>
    </Document>
  )
}


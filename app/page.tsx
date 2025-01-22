"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import dynamic from "next/dynamic"
import FormattedLetter from "./components/FormattedLetter"
import StyledLetter from "./components/StyledLetter"

const DynamicPDFDownloader = dynamic(() => import("./components/PDFDownloader"), {
  ssr: false,
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

const openings = ["Dear", "Hello", "Greetings", "To Whom It May Concern", "Good morning", "Good afternoon"]
const closings = ["Sincerely", "Best regards", "Yours truly", "Respectfully", "Thank you", "Warm regards"]
const backgroundOptions = ["None", "Blue", "Gray", "Green"]

export default function Home() {
  const [text, setText] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    senderName: "",
    senderCompany: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderZip: "",
    senderPhone: "",
    senderEmail: "",
    recipientName: "",
    recipientCompany: "",
    recipientAddress: "",
    recipientCity: "",
    recipientState: "",
    recipientZip: "",
  })
  const [opening, setOpening] = useState(openings[0])
  const [closing, setClosing] = useState(closings[0])
  const [useStyledForm, setUseStyledForm] = useState(false)
  const [background, setBackground] = useState(backgroundOptions[0])
  const [logoUrl, setLogoUrl] = useState("")
  const [pageSize, setPageSize] = useState<"A4" | "LETTER">("A4")
  const [metadata, setMetadata] = useState({
    title: "",
    author: "",
    subject: "",
    keywords: "",
  })
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false)
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPreview(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setContactInfo({
      senderName: "",
      senderCompany: "",
      senderAddress: "",
      senderCity: "",
      senderState: "",
      senderZip: "",
      senderPhone: "",
      senderEmail: "",
      recipientName: "",
      recipientCompany: "",
      recipientAddress: "",
      recipientCity: "",
      recipientState: "",
      recipientZip: "",
    })
    setText("")
    setShowPreview(false)
    setUseStyledForm(false)
    setBackground(backgroundOptions[0])
    setLogoUrl("")
    setPageSize("A4")
    setMetadata({ title: "", author: "", subject: "", keywords: "" })
  }

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Formal Letter Generator
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <Switch id="styled-form" checked={useStyledForm} onCheckedChange={setUseStyledForm} />
          <Label htmlFor="styled-form">Use Styled Form</Label>
        </div>
        {useStyledForm && (
          <div className="space-y-2">
            <Label htmlFor="logo-url">Company Logo URL</Label>
            <Input
              id="logo-url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <Label htmlFor="background">Background Color</Label>
            <Select onValueChange={setBackground} defaultValue={background}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a background color" />
              </SelectTrigger>
              <SelectContent>
                {backgroundOptions.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Sender Information</h2>
            <Label htmlFor="senderName">Name</Label>
            <Input id="senderName" name="senderName" value={contactInfo.senderName} onChange={handleInputChange} />
            <Label htmlFor="senderCompany">Company</Label>
            <Input
              id="senderCompany"
              name="senderCompany"
              value={contactInfo.senderCompany}
              onChange={handleInputChange}
            />
            <Label htmlFor="senderAddress">Address</Label>
            <Input
              id="senderAddress"
              name="senderAddress"
              value={contactInfo.senderAddress}
              onChange={handleInputChange}
            />
            <Label htmlFor="senderCity">City</Label>
            <Input id="senderCity" name="senderCity" value={contactInfo.senderCity} onChange={handleInputChange} />
            <Label htmlFor="senderState">State</Label>
            <Input id="senderState" name="senderState" value={contactInfo.senderState} onChange={handleInputChange} />
            <Label htmlFor="senderZip">ZIP Code</Label>
            <Input id="senderZip" name="senderZip" value={contactInfo.senderZip} onChange={handleInputChange} />
            <Label htmlFor="senderPhone">Phone</Label>
            <Input id="senderPhone" name="senderPhone" value={contactInfo.senderPhone} onChange={handleInputChange} />
            <Label htmlFor="senderEmail">Email</Label>
            <Input id="senderEmail" name="senderEmail" value={contactInfo.senderEmail} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Recipient Information</h2>
            <Label htmlFor="recipientName">Name</Label>
            <Input
              id="recipientName"
              name="recipientName"
              value={contactInfo.recipientName}
              onChange={handleInputChange}
            />
            <Label htmlFor="recipientCompany">Company</Label>
            <Input
              id="recipientCompany"
              name="recipientCompany"
              value={contactInfo.recipientCompany}
              onChange={handleInputChange}
            />
            <Label htmlFor="recipientAddress">Address</Label>
            <Input
              id="recipientAddress"
              name="recipientAddress"
              value={contactInfo.recipientAddress}
              onChange={handleInputChange}
            />
            <Label htmlFor="recipientCity">City</Label>
            <Input
              id="recipientCity"
              name="recipientCity"
              value={contactInfo.recipientCity}
              onChange={handleInputChange}
            />
            <Label htmlFor="recipientState">State</Label>
            <Input
              id="recipientState"
              name="recipientState"
              value={contactInfo.recipientState}
              onChange={handleInputChange}
            />
            <Label htmlFor="recipientZip">ZIP Code</Label>
            <Input
              id="recipientZip"
              name="recipientZip"
              value={contactInfo.recipientZip}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="opening">Opening</Label>
          <Select onValueChange={setOpening} defaultValue={opening}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an opening" />
            </SelectTrigger>
            <SelectContent>
              {openings.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="letterContent">Letter Content</Label>
          <Textarea
            id="letterContent"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your formal text here..."
            className="w-full h-40"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="closing">Closing</Label>
          <Select onValueChange={setClosing} defaultValue={closing}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a closing" />
            </SelectTrigger>
            <SelectContent>
              {closings.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Collapsible open={isPageSizeOpen} onOpenChange={setIsPageSizeOpen}>
          <div className="flex items-center justify-between">
            <Label htmlFor="pageSize">Page Size</Label>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isPageSizeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <Select onValueChange={(value) => setPageSize(value as "A4" | "LETTER")} defaultValue={pageSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select page size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="LETTER">Letter</SelectItem>
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={isMetadataOpen} onOpenChange={setIsMetadataOpen}>
          <div className="flex items-center justify-between">
            <Label>PDF Metadata</Label>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isMetadataOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="space-y-2">
              <Label htmlFor="metadata-title">PDF Title</Label>
              <Input
                id="metadata-title"
                value={metadata.title}
                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metadata-author">PDF Author</Label>
              <Input
                id="metadata-author"
                value={metadata.author}
                onChange={(e) => setMetadata({ ...metadata, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metadata-subject">PDF Subject</Label>
              <Input
                id="metadata-subject"
                value={metadata.subject}
                onChange={(e) => setMetadata({ ...metadata, subject: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metadata-keywords">PDF Keywords</Label>
              <Input
                id="metadata-keywords"
                value={metadata.keywords}
                onChange={(e) => setMetadata({ ...metadata, keywords: e.target.value })}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Button type="submit">Format Letter</Button>
      </motion.form>
      {showPreview && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <div className="border p-4">
            {useStyledForm ? (
              <StyledLetter
                content={text}
                contactInfo={contactInfo}
                opening={opening}
                closing={closing}
                logoUrl={logoUrl}
                background={background}
              />
            ) : (
              <FormattedLetter content={text} contactInfo={contactInfo} opening={opening} closing={closing} />
            )}
          </div>
          <div className="mt-4 space-x-4">
            <DynamicPDFDownloader
              content={text}
              contactInfo={contactInfo}
              opening={opening}
              closing={closing}
              useStyledForm={useStyledForm}
              logoUrl={logoUrl}
              background={background}
              pageSize={pageSize}
              metadata={metadata}
            />
            <Button onClick={resetForm}>Create New Letter</Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}


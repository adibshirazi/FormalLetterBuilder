# Formal Letter Builder

This project is a Next.js and React-based web application designed to create, format, and download formal letters as PDFs. It allows users to input contact details, letter content, and various formatting options to generate professional-looking letters with ease. The app leverages React, Next.js, Framer Motion, and React PDF libraries to provide a dynamic user interface, server-side rendering, and seamless PDF generation experience.

## Features

- **Responsive UI:** The app offers a sleek user interface with smooth animations using **Framer Motion** for transitions and effects.
- **Dynamic Letter Formatting:** Users can create and format letters with options for sender and recipient information, including name, address, and company details.
- **PDF Generation:** Generate letters as PDFs using the **React-PDF** library, with customizable options for page size.
- **PDF Metadata Customization:** Users can customize the PDF's metadata, such as title, author, and subject, before downloading the generated letter.
- **Download Option:** After creating a letter, users can download the PDF directly to their system.
  
## Technologies Used

- **Next.js:** For routing, optimizing, and enhancing the web application performance.
- **React:** For building the user interface and managing state.
- **Framer Motion:** For animations and smooth transitions.
- **React-PDF:** For generating downloadable PDF files from the letter content.
- **HTML5 and CSS3:** For basic structure and styling of the web pages.

## How to Run the Project

1. Clone the repository:
```sh
git clone https://github.com/adibshirazi/FormalLetterBuilder.git
```

2. Navigate to the project directory:
```sh
cd FormalLetterBuilder
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm start
```

5. Open `http://localhost:3000` in your browser to view the application.

## How to Use

1. Enter the sender's and recipient's information in the provided fields.
2. Input the content of the letter in the text area.
3. Adjust formatting settings like page size as needed.
4. Add a logo and change the background of the paper as per your preference.
5. Click on the "Formal Letter" button to create the formal letter.
6. Download the generated PDF using the provided download button.

## Future Improvements

- Add more customization options for letter formatting.
- Allow users to save and load letter templates.
- Support for more advanced styling features.

## License

This project is open-source and available under the [AGPL-3.0 License](LICENSE).

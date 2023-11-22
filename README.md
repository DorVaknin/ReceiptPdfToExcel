
# ReceiptPdfToExcel

A Node.js based tool to convert receipt data from PDF format to an Excel spreadsheet. This package efficiently processes multiple PDF receipts, extracts relevant information, and compiles it into an organized Excel file.

## Features

- Batch processing of PDF receipts.
- Extraction of key receipt details like invoice number, customer name, amount, and date.
- Generation of a structured Excel file with all extracted data.

## Installation

Ensure you have Node.js installed on your system. Then clone the repository and install the dependencies:

```bash
git clone [repository-link]
cd ReceiptPdfToExcel
npm install
```

## Usage

1. Place your PDF receipts in the `receipts` directory.
2. Run the script to process the receipts:

   ```bash
   node ProcessReceipt.js
   ```

3. The extracted receipt data will be saved in `receipt-data.xlsx`.

## Code Structure

- `ProcessReceipt.js`: Main script to process PDF receipts and generate Excel file.
- `receipts/`: Directory to place PDF receipts for processing.
- `receipt-data.xlsx`: Output Excel file with extracted data.

## Contributing

Contributions are welcome. Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');
const fs = require('fs');

// Define the path of the directory that contains the PDF files
const pdfDirectory = './receipts/';

// Read all the PDF files in the directory
fs.readdir(pdfDirectory, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    // Initialize an array to store all the receipt data
    let receiptData = [];
    let promises = [];
    // Iterate over each PDF file in the directory
    files.forEach((file) => {
        // Check if the file is a PDF
        if (file.endsWith('.pdf')) {
            // Read the PDF file
            const pdfFile = pdfDirectory + file;

            promises.push(pdfParse(pdfFile).then(function(data) {
                const text = data.text;

                // Initialize variables to store receipt data
                let invoiceNumber, customerName, receiptAmount, receiptDate;

                // Use regular expressions to extract the invoice number
                const invoiceNumberRegex = /חשבונית מס\s*(\d+)/;
                const invoiceNumberMatch = text.match(invoiceNumberRegex);
                if (invoiceNumberMatch) {
                    invoiceNumber = invoiceNumberMatch[1];
                }

                // Use regular expressions to extract the customer name
                const customerNameRegex = /לכבוד :/;
                const customerNameMatch = text.match(customerNameRegex);
                if(customerNameMatch){
                    // Extract the substring that appears after the keyword "לכבוד :"
                    const start = customerNameMatch.index + customerNameMatch[0].length;
                    const end = text.indexOf("מזהה");
                    const substring = text.substring(start,end);
                    // Use string manipulation to extract the desired information
                    customerName = substring.split("\n")[1];
                }

                // Use regular expressions to extract the receipt amount
                const receiptAmountRegex = /סה"כ לתשלום\s*:\s*([\d,]+\.\d+)/;
                const receiptAmountMatch = text.match(receiptAmountRegex);
                if (receiptAmountMatch) {
                    receiptAmount = receiptAmountMatch[1];
                }

                // Use regular expressions to extract the receipt date
                const receiptDateRegex = /תאריך תשלום\s*(\d+\/\d+\/\d+)/;
                const receiptDateMatch = text.match(receiptDateRegex);
                if (receiptDateMatch) {
                    receiptDate = receiptDateMatch[1];
                }

                // Push the receipt data to the array
                receiptData.push({ InvoiceNumber: invoiceNumber, CustomerName: customerName, Amount: receiptAmount, Date: receiptDate });
            }));
        }
    });

    // Wait for all the promises to resolve
    Promise.all(promises).then(() => {
        // Create a new worksheet
        const ws = xlsx.utils.json_to_sheet(receiptData);
        // Create a new workbook
        const wb = xlsx.utils.book_new();
        // Add the worksheet to the workbook
        xlsx.utils.book_append_sheet(wb, ws, 'Receipt Data');
        // Write the workbook to an Excel file
        xlsx.writeFile(wb, 'receipt-data.xlsx');
        console.log("exported to receipt-data.xlsx")
    });
});

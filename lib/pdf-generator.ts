// A mock PDF generator that would use a PDF library in a real implementation
// In a real app, this would use a library like jspdf, pdfmake, or pdf-lib

interface PDFData {
  bookingReference: string;
  passengerName: string;
  flight: any;
  price: number;
  bookingDate: Date;
}

export function generatePDF(data: PDFData) {
  // In a real implementation, this would generate a PDF file
  // For this demo, we'll use the browser's built-in PDF generation via print
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    console.error('Could not open print window');
    return;
  }
  
  // Format the date and time
  const departureDate = new Date(data.flight.departureTime);
  const arrivalDate = new Date(data.flight.arrivalTime);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Generate a simple HTML layout for the ticket
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Flight Ticket - ${data.bookingReference}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .ticket {
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid #ccc;
          border-radius: 10px;
          overflow: hidden;
        }
        .ticket-header {
          background: linear-gradient(to right, #0c4a6e, #0e7490);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
        }
        .booking-ref {
          font-size: 16px;
        }
        .ticket-body {
          padding: 20px;
        }
        .passenger-info {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px dashed #ccc;
        }
        .flight-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px dashed #ccc;
        }
        .flight-route {
          display: flex;
          align-items: center;
          margin-top: 20px;
        }
        .airport {
          text-align: center;
        }
        .airport-code {
          font-size: 24px;
          font-weight: bold;
        }
        .airport-name {
          font-size: 14px;
          color: #666;
        }
        .flight-path {
          flex-grow: 1;
          height: 2px;
          background-color: #ccc;
          margin: 0 15px;
          position: relative;
        }
        .flight-path::after {
          content: "✈";
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          color: #0c4a6e;
          font-size: 20px;
        }
        .flight-times {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .time {
          text-align: center;
        }
        .departure, .arrival {
          font-weight: bold;
        }
        .date {
          font-size: 14px;
          color: #666;
        }
        .flight-details {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .detail {
          text-align: center;
          flex: 1;
        }
        .detail-label {
          font-size: 12px;
          color: #666;
        }
        .detail-value {
          font-weight: bold;
        }
        .ticket-footer {
          background-color: #f9f9f9;
          padding: 20px;
          font-size: 14px;
          text-align: center;
          color: #666;
        }
        .barcode {
          text-align: center;
          margin: 20px 0;
          font-family: monospace;
          letter-spacing: 2px;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="ticket-header">
          <div class="logo">SkyWay</div>
          <div class="booking-ref">Booking Ref: ${data.bookingReference}</div>
        </div>
        
        <div class="ticket-body">
          <div class="passenger-info">
            <h3>Passenger Information</h3>
            <p><strong>Name:</strong> ${data.passengerName}</p>
          </div>
          
          <div class="flight-info">
            <div>
              <h3>Flight Details</h3>
              <p><strong>Airline:</strong> ${data.flight.airline}</p>
              <p><strong>Flight Number:</strong> ${data.flight.flightNumber}</p>
              <p><strong>Aircraft:</strong> ${data.flight.aircraft}</p>
            </div>
            <div>
              <h3>Booking Details</h3>
              <p><strong>Booking Date:</strong> ${formatDate(data.bookingDate)}</p>
              <p><strong>Price:</strong> ₹${data.price.toFixed(2)}</p>
              <p><strong>Status:</strong> Confirmed</p>
            </div>
          </div>
          
          <div class="flight-route">
            <div class="airport">
              <div class="airport-code">${data.flight.origin.code}</div>
              <div class="airport-name">${data.flight.origin.city}</div>
            </div>
            
            <div class="flight-path"></div>
            
            <div class="airport">
              <div class="airport-code">${data.flight.destination.code}</div>
              <div class="airport-name">${data.flight.destination.city}</div>
            </div>
          </div>
          
          <div class="flight-times">
            <div class="time">
              <div class="departure">${formatTime(departureDate)}</div>
              <div class="date">${formatDate(departureDate)}</div>
            </div>
            
            <div class="time">
              <div class="arrival">${formatTime(arrivalDate)}</div>
              <div class="date">${formatDate(arrivalDate)}</div>
            </div>
          </div>
          
          <div class="flight-details">
            <div class="detail">
              <div class="detail-label">Duration</div>
              <div class="detail-value">
                ${Math.floor(data.flight.duration / 60)}h ${data.flight.duration % 60}m
              </div>
            </div>
            
            <div class="detail">
              <div class="detail-label">Class</div>
              <div class="detail-value">Economy</div>
            </div>
            
            <div class="detail">
              <div class="detail-label">Seat</div>
              <div class="detail-value">Auto-assign</div>
            </div>
            
            <div class="detail">
              <div class="detail-label">Baggage</div>
              <div class="detail-value">15 kg</div>
            </div>
          </div>
          
          <div class="barcode">
            ||||||||||||||||||||||||||||||||||||||||||||||||||||
            <br>
            ${data.bookingReference}${data.flight.flightNumber}
          </div>
        </div>
        
        <div class="ticket-footer">
          <p>Please arrive at the airport at least 2 hours before the scheduled departure time.</p>
          <p>This is an electronic ticket. Please present this along with a valid photo ID at check-in.</p>
          <p>Thank you for choosing SkyWay. Have a pleasant journey!</p>
        </div>
      </div>
      
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `);
  
  printWindow.document.close();
}
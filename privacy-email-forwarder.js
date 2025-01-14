export default {
  async email(message, env, ctx) {
    // Normalize the recipient address to avoid case-sensitivity issues
    const normalizedTo = message.to.toLowerCase();

    // Configuration - Change these values
    const VERIFICATION_CODE = "99"; // Change this to your chosen verification code
    const DESTINATION_EMAIL = "your-private-email@example.com"; // Change this to your forwarding address
    const YOUR_DOMAIN = "yourdomain.com"; // Change this to your domain

    // 1) Handle any address matching verification code before the domain (optionally with a plus-alias).
    //    Examples: newsletter99+weekly@yourdomain.com or contact99@yourdomain.com
    if (new RegExp(`^.*${VERIFICATION_CODE}(\\+.*)?@${YOUR_DOMAIN}$`).test(normalizedTo)) {
      try {
        await message.forward(DESTINATION_EMAIL);
        console.log(`Forwarded email (verification code pattern): ${normalizedTo}`);
      } catch (error) {
        console.error(`Failed to forward email for ${normalizedTo}:`, error);
      }
      return;
    }

    // 2) Handle addresses that match "anything20yymmdd@yourdomain.com" (6-digit date after "20").
    //    Example: newsletter20241231@yourdomain.com
    const dateMatch = normalizedTo.match(new RegExp(`^.*20(\\d{6})@${YOUR_DOMAIN}$`));
    if (dateMatch) {
      const emailDate = dateMatch[1]; // e.g. "241231" for 2024-12-31
      const year = "20" + emailDate.substring(0, 2);
      const month = emailDate.substring(2, 4);
      const day = emailDate.substring(4, 6);
      
      // Create Date objects (note: month is zero-based in JS)
      const targetDate = new Date(year, month - 1, day);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);

      // Handle invalid date edge cases
      if (isNaN(targetDate.getTime())) {
        console.error(`Invalid date in email: ${emailDate}`);
        return;
      }

      // If today is on or before the target date, forward; else drop
      if (currentDate <= targetDate) {
        try {
          await message.forward(DESTINATION_EMAIL);
          console.log(`Forwarded email (date pattern): ${normalizedTo}`);
        } catch (error) {
          console.error(`Failed to forward email for ${normalizedTo}:`, error);
        }
      } else {
        console.log(`Dropped email (date expired): ${normalizedTo}`);
      }
      return;
    }

    // 3) For any other address patterns, do nothing (silently drop or log)
    console.warn(`Unhandled email pattern: ${normalizedTo}`);
  }
};
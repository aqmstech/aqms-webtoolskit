<?php
/**
 * Contact form handler for AQMS Web Toolkit.
 * Receives POST from the React contact form and sends email.
 */

// CORS headers for the SPA
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://aqmswebtoolkit.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Rate limiting via session
session_start();
$now = time();
$cooldown = 60; // seconds between submissions
if (isset($_SESSION['last_contact']) && ($now - $_SESSION['last_contact']) < $cooldown) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Please wait a moment before sending another message.']);
    exit;
}

// Parse JSON body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

// Honeypot check
if (!empty($input['website'] ?? '')) {
    // Bot detected — return fake success
    echo json_encode(['success' => true, 'message' => 'Message sent.']);
    exit;
}

// Validate fields
$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

// Sanitize
$name    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Build email
$to = 'aqmstech@gmail.com';
$emailSubject = "[AQMS Web Toolkit Contact] $subject";
$emailBody  = "Name: $name\n";
$emailBody .= "Email: $email\n";
$emailBody .= "Subject: $subject\n\n";
$emailBody .= "Message:\n$message\n";

$headers  = "From: noreply@aqmswebtoolkit.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send
$sent = mail($to, $emailSubject, $emailBody, $headers);

if ($sent) {
    $_SESSION['last_contact'] = $now;
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
}

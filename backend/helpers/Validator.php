<?php
/**
 * Inquiry Input Validator
 * 
 * Replicates server-side validation rules previously handled by express-validator.
 * Provides strict input sanitization, field-length checks, pattern matching,
 * and email header injection protection.
 */

class Validator
{
    /**
     * Validate inquiry form payload.
     *
     * @param array $input Raw user inputs from the request body
     * @return array ['isValid' => bool, 'errors' => array, 'data' => array]
     */
    public static function validateInquiry(array $input): array
    {
        $errors = [];
        $sanitized = [];

        // 1. Name validation
        $rawName = isset($input['name']) && is_string($input['name']) ? trim($input['name']) : '';
        if ($rawName === '') {
            $errors[] = [
                'field'   => 'name',
                'message' => 'Prosimo, vnesite vaše ime in priimek (Name is required).',
            ];
        } else {
            $nameLen = mb_strlen($rawName, 'UTF-8');
            if ($nameLen < 2 || $nameLen > 100) {
                $errors[] = [
                    'field'   => 'name',
                    'message' => 'Ime mora vsebovati med 2 in 100 znakov.',
                ];
            }
        }
        $sanitized['name'] = $rawName;

        // 2. Email validation
        $rawEmail = isset($input['email']) && is_string($input['email']) ? trim($input['email']) : '';
        if ($rawEmail === '') {
            $errors[] = [
                'field'   => 'email',
                'message' => 'Prosimo, vnesite vaš e-poštni naslov (Email is required).',
            ];
        } elseif (!filter_var($rawEmail, FILTER_VALIDATE_EMAIL)) {
            $errors[] = [
                'field'   => 'email',
                'message' => 'Vnesite veljaven e-poštni naslov (Invalid email address).',
            ];
        } elseif (mb_strlen($rawEmail, 'UTF-8') > 150) {
            $errors[] = [
                'field'   => 'email',
                'message' => 'E-poštni naslov je predolg.',
            ];
        } elseif (preg_match('/[\r\n]/', $rawEmail)) {
            // Anti-header injection check
            $errors[] = [
                'field'   => 'email',
                'message' => 'Vnesite veljaven e-poštni naslov (Invalid email address).',
            ];
        }
        $sanitized['email'] = strtolower($rawEmail);

        // 3. Phone validation (Optional)
        $rawPhone = isset($input['phone']) && is_string($input['phone']) ? trim($input['phone']) : '';
        if ($rawPhone !== '') {
            $phoneLen = mb_strlen($rawPhone, 'UTF-8');
            if ($phoneLen < 5 || $phoneLen > 30) {
                $errors[] = [
                    'field'   => 'phone',
                    'message' => 'Telefonska številka mora vsebovati med 5 in 30 znakov.',
                ];
            } elseif (!preg_match('/^[0-9+\s\-()]+$/', $rawPhone)) {
                $errors[] = [
                    'field'   => 'phone',
                    'message' => 'Telefonska številka lahko vsebuje le številke, presledke, +, - in oklepaje.',
                ];
            }
        }
        $sanitized['phone'] = $rawPhone;

        // 4. Subject / Service validation
        $rawSubject = isset($input['subject']) && is_string($input['subject']) ? trim($input['subject']) : '';
        if ($rawSubject === '') {
            $errors[] = [
                'field'   => 'subject',
                'message' => 'Prosimo, izberite zadevo ali vrsto storitve (Subject/Service is required).',
            ];
        } elseif (mb_strlen($rawSubject, 'UTF-8') > 100) {
            $errors[] = [
                'field'   => 'subject',
                'message' => 'Zadeva je predolga.',
            ];
        } elseif (preg_match('/[\r\n]/', $rawSubject)) {
            // Anti-header injection check
            $errors[] = [
                'field'   => 'subject',
                'message' => 'Zadeva vsebuje neveljavne znake.',
            ];
        }
        $sanitized['subject'] = $rawSubject;

        // 5. Message validation
        $rawMessage = isset($input['message']) && is_string($input['message']) ? trim($input['message']) : '';
        if ($rawMessage === '') {
            $errors[] = [
                'field'   => 'message',
                'message' => 'Prosimo, vnesite vsebino vašega sporočila (Message is required).',
            ];
        } else {
            $msgLen = mb_strlen($rawMessage, 'UTF-8');
            if ($msgLen < 10) {
                $errors[] = [
                    'field'   => 'message',
                    'message' => 'Sporočilo mora vsebovati vsaj 10 znakov.',
                ];
            } elseif ($msgLen > 3000) {
                $errors[] = [
                    'field'   => 'message',
                    'message' => 'Sporočilo ne sme presegati 3000 znakov.',
                ];
            }
        }
        $sanitized['message'] = $rawMessage;

        return [
            'isValid' => count($errors) === 0,
            'errors'  => $errors,
            'data'    => $sanitized,
        ];
    }
}

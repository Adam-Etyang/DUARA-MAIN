<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email</title>
</head>
<body>
    <h2>Enter your verification code</h2>
    @if ($errors->any())
        <p style="color:red;">{{ $errors->first() }}</p>
    @endif
    <form action="{{ route('verify.store') }}" method="POST">
        @csrf
        <input type="text" name="two_factor_code" placeholder="6-digit code">
        <button type="submit">Verify</button>
    </form>
</body>
</html>
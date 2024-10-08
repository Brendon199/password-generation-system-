import React, { useState, useEffect } from 'react'
import { Copy, RefreshCw, Shield } from 'lucide-react'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [strength, setStrength] = useState('')

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === '') {
      setPassword('Please select at least one character type')
      return
    }

    let generatedPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      generatedPassword += chars[randomIndex]
    }
    setPassword(generatedPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++

    if (score < 3) return 'Weak'
    if (score < 5) return 'Medium'
    return 'Strong'
  }

  useEffect(() => {
    if (password) {
      setStrength(calculateStrength(password))
    } else {
      setStrength('')
    }
  }, [password])

  const getStrengthColor = () => {
    switch (strength) {
      case 'Weak':
        return 'text-red-500'
      case 'Medium':
        return 'text-yellow-500'
      case 'Strong':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Password Generator</h1>
        <div className="mb-4">
          <label className="block mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="mr-2"
            />
            Include Uppercase
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="mr-2"
            />
            Include Lowercase
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2"
            />
            Include Numbers
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="mr-2"
            />
            Include Symbols
          </label>
        </div>
        <button
          onClick={generatePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4 flex items-center justify-center"
        >
          <RefreshCw className="mr-2" size={18} />
          Generate Password
        </button>
        <div className="relative mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full p-2 border rounded"
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Copy size={18} />
          </button>
        </div>
        {strength && (
          <div className={`flex items-center ${getStrengthColor()}`}>
            <Shield size={18} className="mr-2" />
            <span>Strength: {strength}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
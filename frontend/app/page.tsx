"use client"

import { useState, useRef, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronDown, Search } from "lucide-react"

const HYPERMARKETS = {
  Carrefour: [
    "CARREFOUR POLONIA DE CDO. RIVADAVIA",
    "EXPRESS BARILOCHE (149)",
    "EXPRESS CAMPANA II(PANAMERICANA)232",
    "EXPRESS CATAMARCA -LOZANO- (178)",
    "EXPRESS COMODORO RIVADAVIA (128)",
    "EXPRESS GRAL RODRIGUEZ (297)",
    "EXPRESS GRAL.ROCA (136)",
    "EXPRESS ING. MASCHWITZ (183)",
    "EXPRESS PUERTO MADRYN II (179)",
    "EXPRESS RIO GRANDE (142)",
    "EXPRESS RIO GRANDE II (180)",
    "EXPRESS SALTA (112)",
    "EXPRESS SALTA III SHOPP.LOZANO(171)",
    "EXPRESS SALTA VII (175)",
    "EXPRESS SAN JUAN (123)",
    "EXPRESS SAN NICOLAS (156)",
    "EXPRESS TRELEW III (45)",
    "EXPRESS USHUAIA (161)",
    "EXPRESS VILLAGE ROSARIO (41)",
    "HIPER ADROGUE (23)",
    "HIPER BALCARCE (58)",
    "HIPER CABALLITO (D. ALVAREZ) (219)",
    "HIPER CONCORDIA (233)",
    "HIPER CORDOBA BARRIO JARDIN (24)",
    "HIPER CORDOBA COLON (9)",
    "HIPER CORRIENTES (159)",
    "HIPER ITUZAINGO (36)",
    "HIPER LA PLATA (8)",
    "HIPER LUJAN (241)",
    "HIPER MALVINAS ARGENTINAS (11)",
    "HIPER MAR DEL PLATA (22)",
    "HIPER MATADEROS (30)",
    "HIPER MENDOZA GUAYMALLEN (17)",
    "HIPER MENDOZA LA ESTACION (29)",
    "HIPER MONTE GRANDE (16)",
    "HIPER MORENO (21)",
    "HIPER MORON (10)",
    "HIPER NEUQUEN (157)",
    "HIPER OLIVOS (UGARTE) (204)",
    "HIPER PILAR (28)",
    "HIPER QUILMES (7)",
    "HIPER ROSARIO (18)",
    "HIPER ROSARIO CENTRO (32)",
    "HIPER ROSARIO SUR (33)",
    "HIPER SALGUERO (6)",
    "HIPER SAN FERNANDO (25)",
    "HIPER SAN ISIDRO (1)",
    "HIPER SAN JUSTO (12)",
    "HIPER SAN MARTIN (15)",
    "HIPER SAN MIGUEL (217)",
    "HIPER TANDIL (31)",
    "HIPER TRELEW II (162)",
    "HIPER VELEZ SARSFIELD (5)",
    "HIPER VICENTE LOPEZ (2)",
    "HIPER VILLA DEVOTO (214)",
    "HIPER VILLA URQUIZA (220)",
    "HIPER WARNES (26)",
    "HIPER ZARATE (210)",
    "MINIHIPER BANFIELD (52)",
    "MINIHIPER BERNAL (227)",
    "MINIHIPER CALETA OLIVIA (63)",
    "MINIHIPER DON TORCUATO (234)",
    "MINIHIPER FLORENCIO VARELA (49)",
    "MINIHIPER GLEW (56)",
    "MINIHIPER GRAL.PACHECO (239)",
    "MINIHIPER GUALEGUAYCHU (240)",
    "MINIHIPER LA RURAL (55)",
    "MINIHIPER LOMAS DE ZAMORA (231)",
    "MINIHIPER MARTIN CORONADO (47)",
    "MINIHIPER MERLO (42)",
    "MINIHIPER NEUQUEN ANTARTIDA (53)",
    "MINIHIPER PERGAMINO (229)",
    "MINIHIPER RECTA MARTINOLI (50)",
    "MINIHIPER RESISTENCIA II (44)",
    "MINIHIPER RINCON DE MILBERG (51)",
    "MINIHIPER RIO GALLEGOS II (48)",
    "MINIHIPER ROSARIO (CENTRO) (268)",
    "MINIHIPER TUCUMAN III (46)",
    "MINIHIPER VENADO TUERTO (259)",
    "MINIHIPER VILLA ALLENDE (54)",
    "MINIHIPER VILLA MERCEDES (235)",
    "EXPRESS SANTA ROSA (147)",
    "EXPRESS HURLINGHAM (218)",
  ],
  Yaguar: [
    "BAHIA BLANCA",
    "CABA - AUTOPISTA",
    "CABA - CABALLITO",
    "CAMPANA",
    "CÓRDOBA",
    "GODOY CRUZ",
    "JOSE C PAZ",
    "MAR DEL PLATA",
    "MASCHWITZ",
    "MORENO",
    "NEUQUEN",
    "RESISTENCIA",
    "SALTA",
    "SAN JUAN",
    "SANTA FE",
    "TIGRE",
    "TRELEW",
  ],
  Makro: [
    "AVELLANEDA",
    "BAHIA BLANCA",
    "BENAVIDEZ",
    "CORDOBA COLÓN",
    "CORDOBA NORTE",
    "CORRIENTES",
    "HAEDO",
    "ITUZAINGO",
    "LOMAS DE ZAMORA",
    "MAR DEL PLATA",
    "MENDOZA",
    "NEUQUEN",
    "OLIVOS",
    "PILAR",
    "QUILMES",
    "RIO CUARTO",
    "ROSARIO",
    "SALTA",
    "SAN JUAN",
    "SAN JUSTO",
    "SAN MARTIN",
    "SANTA FE",
    "TUCUMAN",
  ],
  Maycar: [
    "QUILMES",
    "PILAR",
    "AVELLANEDA",
    "NEUQUEN",
    "RESISTENCIA",
    "ABASTO",
    "LAFERRERE",
    "LOMA HERMOSA",
    "MORENO",
    "MALVINAS ARGENTINAS",
    "EL TALAR - PACHECO",
    "VILLA ORTUZAR",
    "BURZACO",
    "POSADAS",
    "LA PLATA",
    "SALTA",
    "SANTA FE",
    "BAHIA BLANA",
    "SAN JUSTO",
    "MAR DEL PLATA",
  ],
} as const

type HypermarketKey = keyof typeof HYPERMARKETS

interface SearchableSelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  disabled?: boolean
}

function SearchableSelect({ options, value, onChange, placeholder, disabled = false }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-left bg-gray-800 border border-gray-700 rounded-md text-white",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 cursor-pointer",
        )}
      >
        <span className={value ? "text-white" : "text-gray-400"}>{value || placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-3 py-2 text-left text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-400">No se encontraron resultados</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function PDVForm() {
  const [hyper, setHyper] = useState<HypermarketKey>("Carrefour")
  const [branch, setBranch] = useState<string>("")
  const [product, setProduct] = useState<string>("")
  const [obs, setObs] = useState<string>("")
  const [before, setBefore] = useState<File | null>(null)
  const [after, setAfter] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [showValidation, setShowValidation] = useState(false)

  const products = ["Cutex", "Colorsilk", ...(hyper === "Carrefour" ? ["Esmaltes Duo Pack", "Balsamos"] : [])]

  const handleBeforeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBefore(e.target.files[0])
    }
  }

  const handleAfterChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAfter(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!branch || !product || !before || !after) {
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("hypermarket", hyper)
      formData.append("branch", branch)
      formData.append("product", product)
      formData.append("observation", obs)
      formData.append("before", before)
      formData.append("after", after)

      const response = await fetch("https://backend-pdv-vercel.vercel.app/api/generate", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `informe-${branch}.pdf`)
      document.body.appendChild(link)
      link.click()

      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)

      formRef.current?.reset()
      setHyper("Carrefour")
      setBranch("")
      setProduct("")
      setObs("")
      setBefore(null)
      setAfter(null)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = branch && product && before && after

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-500 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-purple-500 rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-purple-500 rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border-2 border-purple-500 rotate-45"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col items-center">
        {/* Header with Logo */}
        <div className="w-full max-w-md mb-8 text-center">
          <div className="mb-6">
            <Image src="/bmg-logo.png" alt="BMG - Be My Guest" width={300} height={150} className="mx-auto" priority />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Reposición Revlon</h1>
          <p className="text-gray-400 text-sm">bmgmkt.com</p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hypermarket" className="text-white">
              Hipermercado
            </Label>
            <SearchableSelect
              options={Object.keys(HYPERMARKETS)}
              value={hyper}
              onChange={(value) => {
                setHyper(value as HypermarketKey)
                setBranch("")
                setProduct("")
              }}
              placeholder="Seleccionar hipermercado"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-white">
              Sucursal {showValidation && !branch && <span className="text-red-400">*</span>}
            </Label>
            <SearchableSelect
              options={HYPERMARKETS[hyper]}
              value={branch}
              onChange={setBranch}
              placeholder="Seleccionar sucursal"
              disabled={!hyper}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product" className="text-white">
              Producto {showValidation && !product && <span className="text-red-400">*</span>}
            </Label>
            <SearchableSelect
              options={products}
              value={product}
              onChange={setProduct}
              placeholder="Seleccionar producto"
              disabled={!hyper}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations" className="text-white">
              Observaciones
            </Label>
            <Textarea
              id="observations"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              placeholder="Observaciones"
              className="min-h-[100px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="before" className="text-white">
              Foto Antes {showValidation && !before && <span className="text-red-400">*</span>}
            </Label>
            <input
              type="file"
              id="before"
              accept="image/*"
              onChange={handleBeforeChange}
              className="w-full border border-gray-700 rounded p-2 bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
            {before && <p className="text-sm text-purple-400">Imagen seleccionada: {before.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="after" className="text-white">
              Foto Después {showValidation && !after && <span className="text-red-400">*</span>}
            </Label>
            <input
              type="file"
              id="after"
              accept="image/*"
              onChange={handleAfterChange}
              className="w-full border border-gray-700 rounded p-2 bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
            {after && <p className="text-sm text-purple-400">Imagen seleccionada: {after.name}</p>}
          </div>

          <Button
            type="submit"
            className={cn(
              "w-full font-semibold py-3 transition-colors duration-200",
              isFormValid
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed",
            )}
            disabled={isSubmitting || !isFormValid}
            onClick={() => setShowValidation(true)}
          >
            {isSubmitting ? "Enviando..." : "Enviar y Generar PDF"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">© 2024 BMG Marketing. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}

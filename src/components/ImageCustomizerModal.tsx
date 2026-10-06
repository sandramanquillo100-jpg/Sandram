import React, { useState } from 'react';
import { X, Upload, Link, Check, RotateCcw, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onSaveImage: (newImageUri: string) => void;
}

export const ImageCustomizerModal: React.FC<ImageCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  onSaveImage
}) => {
  if (!isOpen) return null;

  const defaultInstructorImage = '/src/assets/images/instructor_sena_sst_1791302813723.jpg';
  const defaultWorkshopBanner = '/src/assets/images/banner_sena_sst_1791302828007.jpg';

  const [previewImage, setPreviewImage] = useState<string>(currentImage);
  const [urlInput, setUrlInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP, SVG).');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewImage(urlInput.trim());
    setUrlInput('');
    setErrorMessage(null);
  };

  const handleSave = () => {
    onSaveImage(previewImage);
    onClose();
  };

  const handleResetDefault = () => {
    setPreviewImage(defaultInstructorImage);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Imagen Institucional para Todas las Ventanas
              </h3>
              <p className="text-xs text-slate-500">
                Esta imagen se mostrará en cada módulo y formato oficial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {/* Active Preview */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <img
              src={previewImage}
              alt="Vista previa"
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-600 shadow-md shrink-0"
              onError={() => setErrorMessage('No se pudo cargar la imagen desde la dirección proporcionada.')}
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block text-sm">
                Vista Previa de la Imagen
              </span>
              <p className="text-slate-600 mt-0.5 leading-relaxed">
                Aparecerá en el encabezado, banner del instructor, catálogo de sectores, formato GTC 45, caso real, evaluación y reporte PDF imprimible.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 text-xs text-rose-800 bg-rose-50 border border-rose-200 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Option 1: File Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
              Opción 1: Subir imagen desde tu computadora
            </label>
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-emerald-400 hover:border-emerald-600 rounded-xl cursor-pointer bg-emerald-50/30 hover:bg-emerald-50/60 transition-colors">
              <Upload className="w-6 h-6 text-emerald-700 mb-1" />
              <span className="text-xs font-bold text-emerald-900">
                Haz clic para seleccionar archivo de imagen
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Formatos compatibles: JPG, PNG, WEBP, SVG
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Option 2: Image URL */}
          <div className="space-y-1.5 text-xs">
            <label className="block font-bold text-slate-800 uppercase tracking-wide">
              Opción 2: O ingresar enlace web de la imagen (URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="https://ejemplo.com/mi-imagen.jpg"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-xs"
              >
                Cargar
              </button>
            </div>
          </div>

          {/* Option 3: Presets */}
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
            <span className="block font-bold text-slate-700">Imágenes Predeterminadas SENA SST:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPreviewImage(defaultInstructorImage)}
                className={`flex-1 p-2 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1.5 ${
                  previewImage === defaultInstructorImage
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Foto Instructor SST</span>
                {previewImage === defaultInstructorImage && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => setPreviewImage(defaultWorkshopBanner)}
                className={`flex-1 p-2 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1.5 ${
                  previewImage === defaultWorkshopBanner
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Taller Industrial SST</span>
                {previewImage === defaultWorkshopBanner && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefault}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Original</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Aplicar en Todas las Ventanas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

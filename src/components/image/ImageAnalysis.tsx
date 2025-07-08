'use client';

import { useState, useRef } from 'react';

type PredictionResult = {
  class_id: number;
  class_name: string;
  confidence: number;
};

type ApiResponse = {
  model_name: string;
  predicted_class_id: number;
  predicted_class_name: string;
  confidence: number;
  all_predictions: PredictionResult[];
  image_size: [number, number];
  processed_size: [number, number];
  processing_time: number;
  status: string;
};

type ImageAnalysisProps = {
  category: string;
};

const categoryMap: Record<string, string> = {
  'elma': 'apple',
  'cay': 'tea',
  'findik': 'hazelnut'
};

export default function ImageAnalysis({ category }: ImageAnalysisProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setResult(null);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('top_k', '5');

      const modelName = categoryMap[category];
      const response = await fetch(`https://certain-tuna-rapidly.ngrok-free.app/api/v1/models/${modelName}/predict/file`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analiz başarısız oldu');
      }

      const data: ApiResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError('Görüntü analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Image analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'elma': return '🍎';
      case 'cay': return '🍃';
      case 'findik': return '🌰';
      default: return '📷';
    }
  };

  const getCategoryName = () => {
    switch (category) {
      case 'elma': return 'Elma';
      case 'cay': return 'Çay';
      case 'findik': return 'Fındık';
      default: return 'Bilinmeyen';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-10 w-10 rounded-2xl bg-purple-600 flex items-center justify-center shadow-sm">
          <span className="text-xl">{getCategoryIcon()}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{getCategoryName()} Görüntü Analizi</h3>
          <p className="text-sm text-slate-500">Hastalık ve zararlı tespiti</p>
        </div>
      </div>

      {/* Image Upload Area */}
      <div className="mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          id={`image-upload-${category}`}
        />
        
        {!imagePreview ? (
          <label
            htmlFor={`image-upload-${category}`}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-slate-500">
                <span className="font-semibold">Görüntü yüklemek için tıklayın</span>
              </p>
              <p className="text-xs text-slate-400">PNG, JPG veya JPEG (MAX. 10MB)</p>
            </div>
          </label>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Seçilen görüntü"
              className="w-full h-48 object-cover rounded-xl border border-slate-200"
            />
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      {selectedImage && !result && (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            isAnalyzing
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analiz ediliyor...</span>
            </div>
          ) : (
            'Görüntüyü Analiz Et'
          )}
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Main Result */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-slate-900">Tespit Sonucu</h4>
              <span className="text-xs text-slate-500">
                {(result.processing_time * 1000).toFixed(0)}ms
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Tespit Edilen:</span>
                <span className="text-sm font-semibold text-purple-700">{result.predicted_class_name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Güven Oranı:</span>
                <span className="text-sm font-semibold text-green-600">
                  %{(result.confidence * 100).toFixed(1)}
                </span>
              </div>
              
              {/* Confidence Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* All Predictions */}
          {result.all_predictions && result.all_predictions.length > 1 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h5 className="text-sm font-semibold text-slate-700 mb-3">Diğer Olasılıklar</h5>
              <div className="space-y-2">
                {result.all_predictions.slice(1, 4).map((prediction, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{prediction.class_name}</span>
                    <span className="text-slate-500">%{(prediction.confidence * 100).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Analysis Button */}
          <button
            onClick={handleReset}
            className="w-full py-2 px-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors text-sm font-medium"
          >
            Yeni Analiz Yap
          </button>
        </div>
      )}
    </div>
  );
}

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function SimpleEditor({ value, onChange }) {
  const editorRef = useRef(null);

  const checkSpelling = () => {
    if (editorRef.current) {
      const text = editorRef.current.getContent({ format: 'text' });
      navigator.clipboard.writeText(text).then(() => {
        const confirmed = window.confirm(
          '✓ Texto copiado al portapapeles.\n\n' +
          'Puedes pegarlo en:\n\n' +
          '• https://www.corrector.co/corrector-ortografico/espanol\n' +
          '• Google Docs\n\n' +
          '¿Abrir corrector ahora?'
        );
        if (confirmed) {
          window.open('https://www.corrector.co/corrector-ortografico/espanol', '_blank');
        }
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-bold text-brand-black">
          Contenido del Artículo *
        </label>
        <button
          type="button"
          onClick={checkSpelling}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-semibold text-sm flex items-center gap-2"
        >
          <span>✓</span>
          Revisar Ortografía
        </button>
      </div>

      <div className="border-2 border-brand-gold/30 rounded-lg overflow-hidden">
        <Editor
          apiKey="0d4n1244f5p1s8qgyyzicgro8o5o1v3aj1m3foq017lu5equ"
          onInit={(evt, editor) => editorRef.current = editor}
          value={value}
          onEditorChange={onChange}
          init={{
            height: 500,
            menubar: false,
            language: 'es',
            plugins: [
              'lists', 'link', 'image', 'charmap', 'preview',
              'searchreplace', 'visualblocks', 'code',
              'insertdatetime', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
              'bold italic underline | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist | ' +
              'link image | removeformat | help',
            content_style: `
              body { 
                font-family: 'Ysabeau Office', sans-serif; 
                font-size: 16px; 
                color: #202020; 
                padding: 20px;
              }
              h1, h2, h3, h4, h5, h6 { 
                color: #202020; 
                font-weight: bold; 
              }
              a { 
                color: #C8A448; 
              }
            `,
            branding: false,
            promotion: false
          }}
        />
      </div>

      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <span className="text-blue-600 text-xl">💡</span>
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Consejos:</p>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li>Usa la barra de herramientas como si fuera Microsoft Word</li>
            <li>Selecciona texto y haz click en <strong>B</strong> para negritas</li>
            <li>Usa los botones de alineación para centrar o justificar</li>
            <li>No necesitas saber HTML, el editor lo hace por ti</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
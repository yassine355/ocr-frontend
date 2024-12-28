


// src/components/DocumentView.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Calendar, Loader2 } from 'lucide-react';
import { getDocument } from '../services/api';

const DocumentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const data = await getDocument(id);
        setDocument(data);
      } catch (err) {
        setError('Error fetching document details');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 size={16} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={14} className="mr-1" />
        Back
      </button>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <FileText size={16} className="text-gray-400" />
            <h1 className="text-sm font-medium">{document?.fileName}</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">
              {new Date(document?.uploadDate).toLocaleString()}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="text-xs text-gray-600 whitespace-pre-wrap">
              {document?.extractedData}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = "http://localhost:80/api/memories/upload";

const UploadPanel = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null); // null | 'uploading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleFile = (f) => {
    if (!f || !f.name.endsWith('.json')) {
      setStatus('error');
      setMessage('Please upload a valid .json file.');
      return;
    }
    setFile(f);
    setStatus(null);
    setMessage('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    setMessage('');

    try {
      const text = await file.text();
      const memories = JSON.parse(text);

      if (!Array.isArray(memories)) {
        setStatus('error');
        setMessage('JSON must be an array of memory objects.');
        return;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memories }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setStatus('success');
      setMessage(`${data.count ?? memories.length} memories uploaded to Kafka.`);
      setFile(null);
      onClose();
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Upload failed.');
    }
  };

  const reset = () => {
    setFile(null);
    setStatus(null);
    setMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[380px] z-50 flex flex-col"
            style={{
              backgroundColor: '#0a0a0f',
              borderLeft: '1px solid var(--color-blade-runner-neon)',
              boxShadow: '-4px 0 40px rgba(0,255,249,0.15)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: 'var(--color-blade-runner-neon)', borderOpacity: 0.3 }}
            >
              <h2
                className="text-lg font-bold tracking-widest uppercase"
                style={{
                  color: 'var(--color-blade-runner-neon)',
                  textShadow: '0 0 12px var(--color-blade-runner-neon)',
                }}
              >
                Upload Memories
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto">
              <p className="text-sm text-gray-400 leading-relaxed">
                Upload a <span style={{ color: 'var(--color-blade-runner-neon)' }}>.json</span> file
                containing an array of memory objects. Each will be sent to the Kafka topic.
              </p>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('memory-file-input').click()}
                className="relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300 py-10 px-6 text-center"
                style={{
                  borderColor: isDragging
                    ? 'var(--color-blade-runner-neon)'
                    : 'rgba(0,255,249,0.3)',
                  backgroundColor: isDragging ? 'rgba(0,255,249,0.05)' : 'transparent',
                  boxShadow: isDragging ? '0 0 20px rgba(0,255,249,0.1)' : 'none',
                }}
              >
                <input
                  id="memory-file-input"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <div className="text-3xl">📂</div>
                {file ? (
                  <p style={{ color: 'var(--color-blade-runner-neon)' }} className="text-sm font-bold">
                    {file.name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-gray-300">Drag & drop or click to select</p>
                    <p className="text-xs text-gray-500">JSON files only</p>
                  </>
                )}
              </div>

              {/* Status message */}
              {message && (
                <p
                  className="text-sm text-center"
                  style={{
                    color: status === 'success'
                      ? 'var(--color-blade-runner-neon)'
                      : 'var(--color-blade-runner-orange)',
                    textShadow: status === 'success'
                      ? '0 0 8px var(--color-blade-runner-neon)'
                      : '0 0 8px var(--color-blade-runner-orange)',
                  }}
                >
                  {status === 'uploading' ? '⟳ Uploading...' : status === 'success' ? `✓ ${message}` : `✕ ${message}`}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3 mt-auto">
                {file && status !== 'uploading' && (
                  <button
                    onClick={reset}
                    className="flex-1 py-3 rounded-lg text-sm uppercase tracking-widest font-bold transition-all duration-200"
                    style={{
                      border: '1px solid rgba(255,107,53,0.5)',
                      color: 'var(--color-blade-runner-orange)',
                    }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={handleUpload}
                  disabled={!file || status === 'uploading'}
                  className="flex-1 py-3 rounded-lg text-sm uppercase tracking-widest font-bold transition-all duration-200"
                  style={{
                    backgroundColor: file && status !== 'uploading'
                      ? 'var(--color-blade-runner-neon)'
                      : 'rgba(0,255,249,0.15)',
                    color: file && status !== 'uploading' ? '#000' : 'rgba(0,255,249,0.4)',
                    cursor: file && status !== 'uploading' ? 'pointer' : 'not-allowed',
                  }}
                >
                  {status === 'uploading' ? 'Uploading...' : 'Upload'}
                </button>
              </div>

              {/* JSON format hint */}
              <div
                className="rounded-lg p-4 text-xs font-mono leading-relaxed"
                style={{
                  backgroundColor: 'rgba(0,255,249,0.03)',
                  border: '1px solid rgba(0,255,249,0.1)',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                <p style={{ color: 'rgba(0,255,249,0.6)' }} className="mb-2">Expected format:</p>
                {`[{
  "position": 0,
  "name": "SELF-WORTH",
  "fearState": {
    "tag": "FEAR",
    "videoUrl": "https://..."
  },
  "courageState": {
    "tag": "COURAGE",
    "videoUrl": "https://..."
  }
}]`}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UploadPanel;

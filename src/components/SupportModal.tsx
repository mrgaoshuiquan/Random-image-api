import { motion, AnimatePresence } from "motion/react";
import { X, Coffee, Check, Heart, Copy } from "lucide-react";
import { useState } from "react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIncrementCalls: (amount: number) => void;
}

export default function SupportModal({ isOpen, onClose, onIncrementCalls }: SupportModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const developerEmail = "mrgaoshuiquan@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerEmail);
    setCopiedText("email");
    onIncrementCalls(1);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          ></motion.div>

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100/50 w-full max-w-sm relative z-10 flex flex-col items-stretch p-6"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-pink-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title / Header */}
            <div className="text-center space-y-2 mt-2 mb-6">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-100">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">
                感谢你的支持 💝
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                您的赞助将用于维持高防 CDN 节点、服务租用以及带宽开销，让本免费服务更持久、更具活力！
              </p>
            </div>

            {/* QR Card Frame */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center">
              <div className="bg-white p-3 rounded-xl shadow-xs border border-rose-50 relative aspect-square w-52 overflow-hidden flex items-center justify-center">
                <img
                  src="https://image.gaoops.com/wechat2.png"
                  alt="微信打赏码"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-lg select-none"
                  id="donation-qr"
                />
              </div>

              {/* Status footer badge */}
              <div className="mt-3.5 inline-flex items-center space-x-1.5 text-xs text-slate-500 font-semibold bg-white border border-slate-200/60 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>微信扫码极速赞助支持</span>
              </div>
            </div>

            {/* Developer Contact detail */}
            <div className="mt-5 space-y-2 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                DEVELOPER CONTACT // 独立开发者邮箱
              </p>
              
              <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-100 text-xs text-slate-600">
                <code className="font-mono">{developerEmail}</code>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-pink-600 transition cursor-pointer"
                  title="复制邮箱地址"
                >
                  {copiedText === "email" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Modal Bottom confirmation */}
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl text-sm shadow-md shadow-pink-100 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-1"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>给开发者咖啡充能 ☕</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

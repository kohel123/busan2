import React, { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';
import { INITIAL_CHECKLIST } from '../data/weddingData';
import { CheckSquare, Square, Plus, RotateCcw, Calculator, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

export const InteractiveChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('busan_wedding_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CHECKLIST;
      }
    }
    return INITIAL_CHECKLIST;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [newTaskBudget, setNewTaskBudget] = useState<string>('');
  const [newTaskDDay, setNewTaskDDay] = useState<string>('D-100');

  useEffect(() => {
    localStorage.setItem('busan_wedding_checklist', JSON.stringify(items));
  }, [items]);

  const categories = ['전체', '상견례/택일', '웨딩홀', '스드메', '예물/예단/예복', '신혼여행', '신혼집/혼수', '본식준비'];

  const toggleTask = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const updateActualCost = (id: string, costStr: string) => {
    const cost = parseInt(costStr.replace(/[^0-9]/g, ''), 10) || 0;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, actualCost: cost } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    if (window.confirm('체크리스트를 기본 상태로 초기화하시겠습니까?')) {
      setItems(INITIAL_CHECKLIST);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      category: (selectedCategory === '전체' ? '웨딩홀' : selectedCategory) as any,
      task: newTaskText.trim(),
      dDay: newTaskDDay,
      importance: '권장',
      tips: '사용자 직접 추가 항목',
      completed: false,
      budgetEstimate: parseInt(newTaskBudget.replace(/[^0-9]/g, ''), 10) || 0,
      actualCost: 0
    };

    setItems((prev) => [...prev, newItem]);
    setNewTaskText('');
    setNewTaskBudget('');
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === '전체') return true;
    return item.category === selectedCategory;
  });

  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const totalEstimate = items.reduce((acc, cur) => acc + (cur.budgetEstimate || 0), 0);
  const totalActual = items.reduce((acc, cur) => acc + (cur.actualCost || 0), 0);

  return (
    <section id="checklist-section" className="py-10 sm:py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          스마트 셀프 체크
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2.5 tracking-tight">
          결혼준비 체크리스트 & 예산 계산기
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-2">
          부산 예비 신랑·신부가 직접 항목을 체크하고 지출 예산을 실시간으로 관리할 수 있습니다.
        </p>
      </div>

      {/* Progress & Budget Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Progress Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">준비 진행률</span>
            <span className="text-xs font-bold bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full">
              {completedCount} / {totalCount} 완료
            </span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-extrabold text-slate-900">{progressPercent}%</span>
            <span className="text-xs text-slate-400 mb-1">완료율</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Estimated Budget Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">예상 예산 총액</span>
            <Calculator className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalEstimate.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-slate-500 ml-1">원</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">항목별 초기 계획 예산의 합계입니다.</p>
        </div>

        {/* Actual Spend Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">실제 지출 총액</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {totalActual.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-slate-500 ml-1">원</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            예산 대비 차액: {(totalEstimate - totalActual).toLocaleString()}원
          </p>
        </div>
      </div>

      {/* Main Checklist Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs">
        {/* Category Tabs & Reset Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={resetToDefault}
            className="self-end sm:self-auto text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
            title="기본값으로 되돌리기"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 초기화</span>
          </button>
        </div>

        {/* Add New Custom Task Form */}
        <form onSubmit={handleAddTask} className="mb-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="새로운 체크 항목 추가 (예: 본식 2부 피로연 원피스 구매)"
              className="flex-2 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-400/40"
            />
            <input
              type="text"
              value={newTaskDDay}
              onChange={(e) => setNewTaskDDay(e.target.value)}
              placeholder="D-Day (예: D-60)"
              className="w-24 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-400/40"
            />
            <input
              type="text"
              value={newTaskBudget}
              onChange={(e) => setNewTaskBudget(e.target.value)}
              placeholder="예상 금액(원)"
              className="w-32 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-400/40"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>항목 추가</span>
            </button>
          </div>
        </form>

        {/* Task Items List */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.completed
                  ? 'bg-slate-50/70 border-slate-200/60 opacity-75'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Left Checkbox & Task Info */}
              <div className="flex items-start gap-3 flex-1">
                <button
                  type="button"
                  onClick={() => toggleTask(item.id)}
                  className="mt-0.5 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                      {item.dDay}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                        item.importance === '필수'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.importance}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm font-semibold ${
                      item.completed ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {item.task}
                  </p>
                  {item.tips && <p className="text-[11px] text-slate-500 mt-0.5">{item.tips}</p>}
                </div>
              </div>

              {/* Right Budget Inputs & Delete */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right text-xs">
                  <div className="text-[11px] text-slate-400">
                    예상: {item.budgetEstimate?.toLocaleString() || 0}원
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[11px] font-semibold text-slate-600">실제:</span>
                    <input
                      type="text"
                      defaultValue={item.actualCost ? item.actualCost.toLocaleString() : ''}
                      placeholder="0"
                      onBlur={(e) => updateActualCost(item.id, e.target.value)}
                      className="w-24 text-right px-2 py-0.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden"
                    />
                    <span className="text-[11px] text-slate-500">원</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                  title="항목 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

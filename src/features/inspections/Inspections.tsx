import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';

import {
  toggleCreationForm,
  setWorkflowTab,
  fetchInspectionsFromDb,
  type WorkflowTab,
} from '../inspections/inspectoionsSlice';

import InspectionModule from '../../components/InspectionModule';
import InspectionTemplate from '../../components/InspectionTemplate';
import NewInspectionForm from '../../components/NewInspectionForm';
import { Plus, LayoutDashboard, ClipboardCheck } from 'lucide-react';

const Inspections = () => {
  const dispatch = useAppDispatch();

  const { showCreationForm, activeWorkflowTab, error } = useAppSelector((state) => state.inspections);

  useEffect(() => {
    dispatch(fetchInspectionsFromDb());
  }, [dispatch]);

  const workflowTabs: WorkflowTab[] = [
    'Overview',
    'Quote',
    'Confirm',
    'Surveyor',
    'Preparation',
    'Checklist',
  ];

  return (
    <div className="w-full mx-auto space-y-6 text-gray-800 antialiased p-4 max-w-400">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <ClipboardCheck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              Inspection Control Terminal
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Deploy, track, and annotate regulatory vessel audits
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => dispatch(toggleCreationForm(true))}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
        >
          <Plus size={18} className="font-bold" />
          <span>New Inspection</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-xl">
          {error}
        </div>
      )}

      {showCreationForm ? (
        <NewInspectionForm />
      ) : (
        <>
          <InspectionModule />

          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-gray-50 bg-gray-50/20 flex flex-col gap-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                Operational Pipelines
              </span>
              <h2 className="text-sm font-bold text-gray-800">
                Inspection Workflow Roadmap
              </h2>
            </div>

            <div className="flex border-b border-gray-100 bg-gray-50/40 p-2 overflow-x-auto gap-1">
              {workflowTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => dispatch(setWorkflowTab(tab))}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeWorkflowTab === tab
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 min-h-75">
              {activeWorkflowTab === 'Checklist' ? (
                <InspectionTemplate />
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="p-4 bg-gray-50 rounded-full text-gray-400">
                    <LayoutDashboard size={32} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">
                      {activeWorkflowTab} Pipeline Dashboard
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">
                      Data framework pipeline mapping interface module optimized for upcoming survey synchronization pools.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Inspections;
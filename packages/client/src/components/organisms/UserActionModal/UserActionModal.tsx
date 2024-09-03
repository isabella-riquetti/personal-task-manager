import "./UserActionModal.scss";

import { Action, Category, CreateUserAction, UserAction } from '@careminder/shared/types';
import { CloseOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, Rating } from '@mui/material';
import { addDays, endOfDay, isBefore, isEqual, set } from "date-fns";
import _ from "lodash";
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useMemo, useState } from 'react';

import { useGetActionsQuery } from '@/api/actions';
import { useCreateUserActionMutation, useDeleteUserActionMutation, useUpdateUserActionMutation } from "@/api/userActions";
import FocusDatePicker from "@/components/atoms/FocusDatePicker";
import FocusTimePicker from "@/components/atoms/FocusTimePicker";
import { getColoredIcon, getPlainIcon } from "@/utils/category";

import { ActionIconComponent, DurationIconComponent } from '../../../assets/icons/form';

interface AddNewReminderModalProps {
    setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userAction: Partial<UserAction>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 540,
    maxWidth: "95%",
    boxShadow: 24,
};

const CATEGORY_ORDER = [
    "Skin Care",
    "Hair Care",
    "Body Care",
    "Nail Care",
    "Mind Care",
]

export default function UserActionModal({ setIsAddModalOpen, userAction }: AddNewReminderModalProps) {
    const { data: actions } = useGetActionsQuery();
    const groupedActions = useMemo(() => _(actions)
        .groupBy('category')
        .toPairs()
        .sortBy(([category]) => CATEGORY_ORDER.indexOf(category))
        .map(([category, items]) => ({
            label: category,
            items: items,
        }))
        .value(), [actions]);

    const { action_id, start_at, end_at, all_day } = userAction;
    const [selectedAction, setSelectedActions] = useState<Action | undefined>();
    const [selectedAllDay, setSelectedAllDay] = useState<boolean>(!!all_day);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined | null>(start_at);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined | null>(end_at);

    useEffect(() => setSelectedStartDate(start_at), [start_at]);
    useEffect(() => setSelectedEndDate(end_at), [end_at]);
    useEffect(() => setSelectedAllDay(!!all_day), [all_day]);
    useEffect(() => {
        if (action_id && actions) setSelectedActions(actions.find(a => a.id === action_id));
    }, [actions, action_id]);

    useEffect(() => {
        if (selectedStartDate && selectedEndDate && isBefore(selectedEndDate, selectedStartDate)) {
            setSelectedEndDate(set(addDays(selectedStartDate, 1), {
                hours: selectedEndDate.getHours(),
                minutes: selectedEndDate.getMinutes(),
                seconds: selectedEndDate.getSeconds(),
            }));
        }
    }, [selectedStartDate, selectedEndDate]);

    const groupedItemTemplate = (option: { label: Category }) => {
        const Icon = getColoredIcon(option.label);
        return (
            <div className="flex align-items-center gap-1 py-2 px-1 border-t border-pink-100">
                <Icon className="max-w-6 max-h-6" />
                <div>{option.label}</div>
            </div>
        );
    };

    const itemTemplate = (option: Action) => {
        const Icon = getPlainIcon(option.category);
        return (
            <div className="flex align-items-center gap-1 py-2 px-1 border-t border-pink-100">
                <div className="w-6 h-6 flex items-center justify-center">
                    <Icon className="max-w-4 max-h-4" />
                </div>
                <div>{option.name}</div>
                <Rating className="ml-auto text-pink-400" name="size-small" value={option.dificultity ?? 1} readOnly size="small" />
            </div>
        );
    };

    const [createUserActionMutation] = useCreateUserActionMutation();
    const createUserAction = async (req: CreateUserAction): Promise<UserAction> =>
        createUserActionMutation(req).unwrap();

    const callCreateUserAction = async () => {
        if (!selectedStartDate) return;

        if (selectedStartDate && selectedAction?.id) {
            await createUserAction({
                start_at: selectedStartDate,
                end_at: selectedEndDate ?? selectedStartDate,
                action_id: selectedAction.id,
                all_day: selectedAllDay
            });

            setIsAddModalOpen(false);
        }
    }

    const [deleteUserActionMutation] = useDeleteUserActionMutation();
    const deleteUserAction = async (req: number): Promise<void> =>
        deleteUserActionMutation(req).unwrap();

    const callDeleteUserAction = async () => {
        await deleteUserAction(userAction.id!);
        setIsAddModalOpen(false);
    };

    const [updateUserActionMutation] = useUpdateUserActionMutation();
    const updateUserAction = async (req: Partial<UserAction>): Promise<UserAction> =>
        updateUserActionMutation(req).unwrap();

    const callUpdateUserAction = async () => {
        if (!selectedStartDate) return;

        if (selectedStartDate && selectedAction?.id) {
            await updateUserAction({
                id: userAction.id!,
                start_at: selectedStartDate,
                end_at: selectedEndDate ?? selectedStartDate,
                action_id: selectedAction.id,
                all_day: selectedAllDay
            });
            setIsAddModalOpen(false);
        }
    };

    const handleSaveButton = async () => {
        if (userAction?.id) await callUpdateUserAction();
        else await callCreateUserAction();
    }

    const handleAllDayChange = (checked: boolean) => {
        if (!checked && selectedStartDate && selectedEndDate && isEqual(selectedStartDate, selectedEndDate)) setSelectedEndDate(endOfDay(selectedEndDate));
        setSelectedAllDay(checked);
    }

    return (
        <Modal
            style={{
                zIndex: 1000,
            }}
            open={true}
            onClose={() => setIsAddModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rounded-xl bg-white">
                <FormGroup>
                    <div className="w-full rounded-t-xl bg-pale-50 flex px-4 py-2">
                        <span className="text-pale-500 font-bold uppercase">New Minder</span>
                        <div className="ml-auto flex gap-2">
                            {!!userAction?.id && <DeleteOutline onClick={callDeleteUserAction} className="ml-auto cursor-pointer hover:text-red-600" />}
                            <CloseOutlined onClick={() => setIsAddModalOpen(false)} className="ml-auto cursor-pointer hover:text-red-200" />
                        </div>
                    </div>
                    <div className="form p-4 grid grid-cols-[25px,calc(100%-25px-0.75rem)] grid-rows-[auto,auto,auto] items-center justify-start gap-2">
                        <ActionIconComponent className="w-6 h-6" />
                        <Dropdown
                            value={selectedAction}
                            onChange={(e) => setSelectedActions(e.value)}
                            options={groupedActions}
                            optionLabel="name"
                            optionGroupLabel="label"
                            optionGroupChildren="items"
                            itemTemplate={itemTemplate}
                            optionGroupTemplate={groupedItemTemplate}
                            className="w-full"
                            placeholder="Select Minder" />
                        <DurationIconComponent className="w-6 h-6" />
                        <div className="flex gap-2 dates">
                            <FocusDatePicker
                                value={selectedStartDate}
                                setValue={setSelectedStartDate}
                            />
                            {!selectedAllDay && <>
                                <FocusTimePicker
                                    value={selectedStartDate}
                                    setValue={setSelectedStartDate} />
                                <FocusTimePicker
                                    value={selectedEndDate}
                                    setValue={setSelectedEndDate} />
                            </>}
                            <FocusDatePicker
                                value={selectedEndDate}
                                setValue={setSelectedEndDate}
                            />
                        </div>
                        <div></div>
                        <FormControlLabel
                            className="mt-[-10px] max-w-fit text-primary"
                            control={<Checkbox
                                className="ml-1"
                                checked={selectedAllDay}
                                onChange={(event) => handleAllDayChange(event.target.checked)}
                            />}
                            label="All Day" />
                        <div className="flex items-end ml-auto col-span-2 mt-4">
                            <Button variant="contained" onClick={handleSaveButton}>Save</Button>
                        </div>
                    </div>
                </FormGroup>
            </Box>
        </Modal>
    )
}
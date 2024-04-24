import React from 'react';

function SendNotificationForm({ formStep, isSendNotification, isSendNotificationHandleChange, isReportSent, Email, handleClose, handleReportSend }) {

    return (
        <div>
            {formStep === 4 && (
                <div className="pb-6 px-6">
                    <div className="flex flex-col gap-1">
                        <ol>
                            <li>
                                <h4 className="text-l font-semibold uppercase">4. Send Notification
                                    <span className="text-xs normal-case block">
                                        Tick the appropriate box below and if “YES” provide further detail requested.
                                    </span>
                                </h4>
                            </li>
                            <div className="grid grid-cols-4 py-2 text-sm items-center">
                                <div className="col-span-3">
                                    <span className="pr-3">4.1</span>
                                    <label>Do you want to send the “HAZMAT report template” to Operator?</label>
                                </div>
                                <div className="flex gap-2">
                                    <input id="Yes" onClick={isSendNotificationHandleChange} className="h-5 w-5" type="radio" value="Yes" name="transportCommuters" />Yes
                                    <input id="No" onClick={isSendNotificationHandleChange} className="h-5 w-5" type="radio" value="No" name="transportCommuters" /> No
                                </div>
                            </div>
                            {isSendNotification && (
                                <div>
                                    <div className="font-semibold">
                                        <span className="pr-3">4.2</span>
                                        <label>Email</label>
                                    </div>
                                    <input
                                        value={Email}
                                        disabled
                                        type="text"
                                        placeholder={Email}
                                        className="h-8 px-4 ml-8 border rounded-md w-full"
                                    />
                                </div>
                            )}
                            {isReportSent && (
                                <div className="flex flex-col items-center justify-center">
                                    <div className="mt-4.5"></div>
                                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">Hazmat Report Sent</h2>
                                    <div className="mt-4.5"></div>
                                    <p>Hazmat Report Template has been successfully sent to the operator. The operator will receive a notification.</p>
                                    <div className="mt-4.5"></div>
                                </div>
                            )}
                            {isReportSent && (
                                <div className="flex justify-end items-end mt-10 gap-10">
                                    <button onClick={handleClose} className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500">Done</button>
                                </div>
                            )}
                        </ol>
                    </div>
                    {isSendNotification && !isReportSent && (
                        <div className="flex justify-end items-end mt-10 gap-10">
                            <button onClick={handleReportSend} className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500">Send</button>
                        </div>
                    )}
                    {!isSendNotification && !isReportSent && (
                        <div className="flex justify-end items-end mt-10 gap-10">
                            <button onClick={handleClose} className="h-11 px-6 rounded-md bg-black text-white hover:bg-slate-500">Close</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SendNotificationForm;

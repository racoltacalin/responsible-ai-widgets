// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorAnalysisDashboard } from "@responsible-ai/error-analysis";
import React from "react";

import { config } from "./config";
import { FlaskCommunication } from "./FlaskCommunication";
import { modelData } from "./modelData";

export class ErrorAnalysis extends React.Component {
  public render(): React.ReactNode {
    let requestPredictionsMethod = undefined;
    let requestMatrixMethod = undefined;
    let requestDebugMLMethod = undefined;
    let requestImportancesMethod = undefined;
    if (config.baseUrl !== undefined) {
      requestPredictionsMethod = async (data: any[]): Promise<any[]> => {
        return FlaskCommunication.callFlaskService(data, "/predict");
      };
      requestMatrixMethod = async (data: any[]): Promise<any[]> => {
        return FlaskCommunication.callFlaskService(data, "/matrix");
      };
      requestDebugMLMethod = async (data: any[]): Promise<any[]> => {
        return FlaskCommunication.callFlaskService(data, "/tree");
      };
      requestImportancesMethod = async (data: any[]): Promise<any[]> => {
        return FlaskCommunication.callFlaskService(data, "/importances");
      };
    }

    return (
      <ErrorAnalysisDashboard
        modelInformation={{ modelClass: "blackbox" }}
        dataSummary={{
          categoricalMap: modelData.categoricalMap,
          classNames: modelData.classNames,
          featureNames: modelData.featureNames
        }}
        testData={modelData.trainingData}
        predictedY={modelData.predictedY}
        probabilityY={modelData.probabilityY}
        trueY={modelData.trueY}
        precomputedExplanations={{
          ebmGlobalExplanation: modelData.ebmData,
          globalFeatureImportance: modelData.globalExplanation,
          localFeatureImportance: modelData.localExplanations
        }}
        requestPredictions={requestPredictionsMethod}
        requestDebugML={requestDebugMLMethod}
        requestMatrix={requestMatrixMethod}
        requestImportances={requestImportancesMethod}
        localUrl={modelData.localUrl}
        locale={modelData.locale}
        features={modelData.featureNames}
      />
    );
  }
}

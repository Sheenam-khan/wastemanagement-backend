//import system_modules from "../../auth_models/system_modules";
import { createUnit, deleteUnit, getUnit, updateUnit } from '../services/unit';

const { too, ReS, ReE, TE } = require('../services/util');
const { status_codes_msg } = require('../utils/appStatics');

export const createUnitController = async (req, res) => {
  const param = req.body;

  try {
    const [err, newPackage] = await too(createUnit(param));
    if (err) {
      ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (newPackage) {
      ReS(
        res,
        {
          message: 'NEW UNIT ADDED',
          DATA: newPackage,
        },
        status_codes_msg.CREATED.code,
      );
    }
  } catch (error) {
    ReE(res, error.message, status_codes_msg.FAILED.code);
  }
};

export const getUnitController = async (req, res) => {
  const param = req.query;
  try {
    const [err, packageByKey] = await too(getUnit(param));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (packageByKey) {
      return ReS(
        res,
        {
          message: `FETCH SUCCESSFULLY`,
          DATA: packageByKey.rows,
          count: packageByKey.count,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

export const updateUnitController = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const [err, updatedPackage] = await too(updateUnit(body, id));
    console.log(updatedPackage);

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (updatedPackage) {
      return ReS(
        res,
        {
          message: `DATA UPDATED`,
          DATA: updatedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

export const deleteUnitController = async (req, res) => {
  const { id } = req.params;
  try {
    const [err, deletedPackage] = await too(deleteUnit(id));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (deletedPackage) {
      return ReS(
        res,
        {
          message: `UNIT DELETED`,
          DATA: deletedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

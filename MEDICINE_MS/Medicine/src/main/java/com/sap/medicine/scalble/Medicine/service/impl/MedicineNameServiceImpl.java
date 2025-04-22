package com.sap.medicine.scalble.Medicine.service.impl;

import com.sap.medicine.scalble.Medicine.Repository.Medicine;
import com.sap.medicine.scalble.Medicine.service.MedicineNameService;
import com.sap.medicine.scalble.Medicine.service.MedicineRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MedicineNameServiceImpl implements MedicineNameService {

  MedicineRepository medicineRepository;

  public MedicineNameServiceImpl(MedicineRepository medicineRepository) {
    this.medicineRepository = medicineRepository;

  }

  @Override
  public List<String> getMedicineName() {
   return medicineRepository.findAll()
        .stream()
        .map(Medicine::getName)
        .toList();
  }
}

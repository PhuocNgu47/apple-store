import express from 'express';
import Address from '../models/Address.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/addresses
 * Lấy danh sách địa chỉ của user
 */
router.get('/', protect, async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id })
      .sort({ isDefault: -1, createdAt: -1 });
    
    res.json({
      success: true,
      addresses
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách địa chỉ'
    });
  }
});

/**
 * GET /api/addresses/:id
 * Lấy chi tiết một địa chỉ
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy địa chỉ'
      });
    }
    
    res.json({
      success: true,
      address
    });
  } catch (error) {
    console.error('Get address error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy địa chỉ'
    });
  }
});

/**
 * POST /api/addresses
 * Tạo địa chỉ mới
 */
router.post('/', protect, async (req, res) => {
  try {
    const { name, phone, address, ward, district, city, country, zipCode, isDefault, label } = req.body;
    
    // Validation
    if (!name || !phone || !address || !city) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin: tên, số điện thoại, địa chỉ, thành phố'
      });
    }

    // Validate phone
    const phoneRegex = /^(0|\+84)[1-9][0-9]{8,9}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Số điện thoại không hợp lệ'
      });
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await Address.updateMany(
        { userId: req.user.id },
        { $set: { isDefault: false } }
      );
    }

    const newAddress = new Address({
      userId: req.user.id,
      name: name.trim(),
      phone: cleanPhone,
      address: address.trim(),
      ward: ward?.trim() || '',
      district: district?.trim() || '',
      city: city.trim(),
      country: country?.trim() || 'Vietnam',
      zipCode: zipCode?.trim() || '',
      isDefault: isDefault || false,
      label: label?.trim() || 'Nhà riêng'
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: 'Thêm địa chỉ thành công',
      address: newAddress
    });
  } catch (error) {
    console.error('Create address error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo địa chỉ'
    });
  }
});

/**
 * PUT /api/addresses/:id
 * Cập nhật địa chỉ
 */
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, phone, address, ward, district, city, country, zipCode, isDefault, label } = req.body;
    
    const addressDoc = await Address.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!addressDoc) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy địa chỉ'
      });
    }

    // Validate phone if provided
    if (phone) {
      const phoneRegex = /^(0|\+84)[1-9][0-9]{8,9}$/;
      const cleanPhone = phone.replace(/\s/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        return res.status(400).json({
          success: false,
          message: 'Số điện thoại không hợp lệ'
        });
      }
      addressDoc.phone = cleanPhone;
    }

    // If setting as default, unset other defaults
    if (isDefault && !addressDoc.isDefault) {
      await Address.updateMany(
        { userId: req.user.id, _id: { $ne: req.params.id } },
        { $set: { isDefault: false } }
      );
      addressDoc.isDefault = true;
    }

    // Update fields
    if (name) addressDoc.name = name.trim();
    if (address) addressDoc.address = address.trim();
    if (ward !== undefined) addressDoc.ward = ward?.trim() || '';
    if (district !== undefined) addressDoc.district = district?.trim() || '';
    if (city) addressDoc.city = city.trim();
    if (country) addressDoc.country = country.trim();
    if (zipCode !== undefined) addressDoc.zipCode = zipCode?.trim() || '';
    if (label) addressDoc.label = label.trim();

    await addressDoc.save();

    res.json({
      success: true,
      message: 'Cập nhật địa chỉ thành công',
      address: addressDoc
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật địa chỉ'
    });
  }
});

/**
 * DELETE /api/addresses/:id
 * Xóa địa chỉ
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy địa chỉ'
      });
    }

    res.json({
      success: true,
      message: 'Xóa địa chỉ thành công'
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa địa chỉ'
    });
  }
});

/**
 * PATCH /api/addresses/:id/set-default
 * Đặt địa chỉ làm mặc định
 */
router.patch('/:id/set-default', protect, async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy địa chỉ'
      });
    }

    // Unset other defaults
    await Address.updateMany(
      { userId: req.user.id, _id: { $ne: req.params.id } },
      { $set: { isDefault: false } }
    );

    // Set this as default
    address.isDefault = true;
    await address.save();

    res.json({
      success: true,
      message: 'Đã đặt làm địa chỉ mặc định',
      address
    });
  } catch (error) {
    console.error('Set default address error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi đặt địa chỉ mặc định'
    });
  }
});

export default router;

